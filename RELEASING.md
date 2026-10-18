# Releasing @venqoo/brand

`@venqoo/brand` is published to the public npm registry by GitHub Actions.
No npm token exists anywhere. Publishing rights come from npm **trusted
publishing**: npm trusts the `release.yml` workflow in the `venqoo/brand`
repository, and GitHub proves the workflow's identity with a short-lived
OIDC token at publish time. Every release carries a signed provenance
attestation that links the tarball to the exact commit and workflow run.

## Cutting a release

Prerequisites: on `main`, working tree clean, latest CI run green.

```bash
npm version patch -m "Release v%s"   # or minor / major
git push origin main --follow-tags
```

`npm version` bumps `package.json`, commits, and creates the annotated tag
`vX.Y.Z`. Pushing the tag triggers `.github/workflows/release.yml`, which
installs, lints, type-checks, tests, builds, checks that the tag matches the
package version, and runs `npm publish`.

Verify afterwards (the registry needs about a minute to process a publish):

```bash
npm view @venqoo/brand version
```

The package page on npmjs.com shows a **Provenance** badge on the new
version. Published versions cannot be overwritten; if a release is broken,
publish a fixed version and deprecate the broken one with `npm deprecate`.

## What the publishing binding depends on

The trusted publisher entry on npmjs.com records exactly:

| Field               | Value           |
| ------------------- | --------------- |
| Organization / user | `venqoo`        |
| Repository          | `brand`         |
| Workflow filename   | `release.yml`   |
| Environment         | *(none)*        |
| Allowed actions     | publish, stage publish |

In addition, npm requires `repository.url` in `package.json` to match the
repository the workflow runs from, and the GitHub repository must be public
for provenance to be generated.

**If the repository, the GitHub organization, or the workflow file is ever
renamed or moved**, the next release fails at the publish step until all of
these are updated:

1. The trusted publisher entry on npmjs.com (package → Settings → Trusted
   publishing), or via `npm trust revoke` and `npm trust github`.
2. `repository.url` in `package.json`.

Inspect the current entry with:

```bash
npm trust list @venqoo/brand
```

## Account and organization

- The `@venqoo` scope is owned by the npm **organization** `venqoo`, not by a
  personal account. Packages are published into the organization.
- The organization requires two-factor authentication for all members.
- The package's *Publishing access* setting is "Require two-factor
  authentication and disallow tokens". Only the trusted publisher workflow or
  a 2FA-protected human can publish.
- Human accounts use a security key for 2FA. Recovery codes live in the
  company password manager. Never create npm access tokens for this package.

## Adding another package to the organization

Trusted publishing is configured per package. For each new `@venqoo/*`
package:

1. Create the repository with a `release.yml` workflow like this one and the
   same `publishConfig` (`access: public`, `provenance: true`). Make sure
   `repository.url` points at the new repository.
2. Publish the first version by hand from a machine logged in as an
   organization member. Provenance cannot be generated locally, so disable it
   for this one publish:

   ```bash
   npm login
   npm publish --access public --provenance=false
   ```

3. Register the trusted publisher (opens the browser for 2FA):

   ```bash
   npm trust github @venqoo/<name> --file release.yml --repo venqoo/<repo> --allow-publish
   ```

   A new entry expires if no publish succeeds through it within **two days**,
   so continue immediately.
4. Bump, tag and push to run the first release through GitHub Actions, and
   confirm the provenance badge appears.
5. On npmjs.com, set the package's Publishing access to "Require two-factor
   authentication and disallow tokens".

## Troubleshooting

- **Publish step fails with 404 or 403**: the trusted publisher fields do not
  match the repository or workflow filename (case-sensitive), or the entry
  expired. Check with `npm trust list` and fix the entry; no re-tag needed if
  the tag can be re-run from the Actions UI.
- **"tag X != package Y"**: the tag was created by hand and does not match
  `package.json`. Delete the tag, fix the version, tag again.
- **`npm view` still shows the old version**: wait a minute; the registry
  processes publishes asynchronously.
- **Local `npm publish` complains about provenance**: pass
  `--provenance=false`; provenance is only available in CI.
