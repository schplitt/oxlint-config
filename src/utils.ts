import { readFileSync } from 'node:fs'
import process from 'node:process'

import { findUpSync } from 'find-up-simple'

export function isInGitHooksOrLintStaged(): boolean {
  return !!(
    process.env.GIT_PARAMS ??
    process.env.VSCODE_GIT_COMMAND ??
    process.env.npm_lifecycle_script?.startsWith('lint-staged')
  )
}

/**
 * Returns true when running inside an editor (VS Code, JetBrains, Vim, etc.)
 * rather than from the CLI or CI. Used to downgrade certain rules to warnings
 * so the editor experience stays comfortable.
 */
export function isInEditorEnv(): boolean {
  if (process.env.CI) return false
  if (isInGitHooksOrLintStaged()) return false
  return !!(
    process.env.VSCODE_PID ??
    process.env.VSCODE_CWD ??
    process.env.JETBRAINS_IDE ??
    process.env.VIM ??
    process.env.NVIM
  )
}

/**
 * Returns `errorSev` when running from CLI/CI, `warnSev` when inside an editor.
 * This mirrors the dynamic severity pattern from the original ESLint config.
 * @param isInEditor - Whether the linter is currently running inside an editor.
 * @param errorSev - Severity to use when not in an editor. Defaults to `'error'`.
 */
export function sev(isInEditor: boolean, errorSev: 'error' | 'warn' = 'error'): 'error' | 'warn' {
  return isInEditor ? 'warn' : errorSev
}

/**
 * Returns true when `vitest.config.*` is found anywhere up the file tree.
 * Uses `findUpSync` so it can be called from synchronous config code.
 */
const VITEST_CONFIG_FILES = [
  'vitest.config.ts',
  'vitest.config.js',
  'vitest.config.mts',
  'vitest.config.mjs',
  'vitest.config.cts',
  'vitest.config.cjs',
]

export function detectVitest(cwd = process.cwd()): boolean {
  return VITEST_CONFIG_FILES.some((name) => !!findUpSync(name, { cwd }))
}

/**
 * Returns the directory containing `angular.json` if found, or `false`.
 * @param cwd - Directory to start searching upward from. Defaults to `process.cwd()`.
 */
export function detectAngular(cwd = process.cwd()): string | false {
  const file = findUpSync('angular.json', { cwd })
  if (!file) return false
  // Return the directory path so angular rules can be scoped
  return file.replace(/[\\/]angular\.json$/, '')
}

/**
 * Returns true when `pnpm-workspace.yaml` is found anywhere up the file tree.
 * @param cwd - Directory to start searching upward from. Defaults to `process.cwd()`.
 */
export function detectPnpmWorkspace(cwd = process.cwd()): boolean {
  return !!findUpSync('pnpm-workspace.yaml', { cwd })
}

/**
 * Returns true when a `package.json` containing any dependency with "vue" in its
 * name is found anywhere up the file tree.
 *
 * Checks `dependencies`, `devDependencies`, and `peerDependencies`.
 * @param cwd - Directory to start searching upward from. Defaults to `process.cwd()`.
 */
export function detectVue(cwd = process.cwd()): boolean {
  const file = findUpSync('package.json', { cwd })
  if (!file) return false
  try {
    const pkg = JSON.parse(readFileSync(file, 'utf8')) as Record<string, Record<string, string>>
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    }
    return Object.keys(allDeps).some((name) => name.includes('vue'))
  } catch {
    return false
  }
}
