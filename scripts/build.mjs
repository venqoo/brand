// Builds dist/: ESM + .d.ts via tsc, plus the single self-contained stylesheet.
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

rmSync(dist, { recursive: true, force: true })
execFileSync('tsc', ['-p', 'tsconfig.build.json'], {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
mkdirSync(dist, { recursive: true })
copyFileSync(resolve(root, 'styles.css'), resolve(dist, 'styles.css'))
console.log('built @venqoo/brand → dist/')
