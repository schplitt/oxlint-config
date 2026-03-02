import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import consola from 'consola'
import { findUp } from 'find-up-simple'

/**
 * Walks up the directory tree to find the closest `package.json`.
 * @param startingDir - Directory to start searching from. Defaults to `process.cwd()`.
 */
export async function findClosestPackageJsonDir(
  startingDir: string = process.cwd(),
): Promise<string | null> {
  const foundPath = await findUp('package.json', { cwd: startingDir })
  return foundPath ? path.dirname(foundPath) : null
}

const CONFIG_EXTENSIONS = ['mjs', 'cjs', 'js', 'ts', 'mts', 'cts']

function getExistingOxlintConfigFile(dir: string): string | null {
  for (const ext of CONFIG_EXTENSIONS) {
    const filePath = path.join(dir, `oxlint.config.${ext}`)
    if (fs.existsSync(filePath)) return filePath
  }
  return null
}

/**
 * Creates (or overwrites) `oxlint.config.ts` in the given directory.
 * @param projectDir - The root directory of the project.
 */
export function createOrOverwriteOxlintConfigFile(projectDir: string): void {
  const existing = getExistingOxlintConfigFile(projectDir)
  if (existing) {
    consola.info(`Overwriting existing config: ${path.basename(existing)}`)
    fs.rmSync(existing)
  }

  const configPath = path.join(projectDir, 'oxlint.config.ts')
  const content = `import schplitt from '@schplitt/oxlint-config'

export default schplitt()
`
  fs.writeFileSync(configPath, content, { encoding: 'utf-8' })
  consola.success('Created oxlint.config.ts')
}

/**
 * Adds lint and format scripts to the project's `package.json`.
 * @param projectDir - The root directory of the project.
 */
export function addScriptsToPackageJson(projectDir: string): void {
  const packageJsonPath = path.join(projectDir, 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    consola.warn('Could not find package.json in project directory')
    return
  }

  try {
    const content = fs.readFileSync(packageJsonPath, 'utf-8')
    // oxlint-disable-next-line typescript/no-unsafe-assignment
    const packageJson = JSON.parse(content)

    // oxlint-disable-next-line typescript/no-unsafe-member-access
    packageJson.scripts ??= {}
    // oxlint-disable-next-line typescript/no-unsafe-member-access
    packageJson.scripts.lint = 'oxlint && oxfmt --check'
    // oxlint-disable-next-line typescript/no-unsafe-member-access
    packageJson.scripts['lint:fix'] = 'oxlint --fix && oxfmt --write'

    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, {
      encoding: 'utf-8',
    })
    consola.success('Added lint and format scripts to package.json')
  } catch (error) {
    consola.error('Failed to update package.json:', error)
  }
}

const VSCODE_SETTINGS: Record<string, unknown> = {
  'editor.defaultFormatter': 'oxc.oxc-vscode',
  'editor.formatOnSave': true,
  'editor.formatOnSaveMode': 'file',
  'editor.codeActionsOnSave': {
    'source.fixAll.eslint': 'never',
    'source.fixAll.oxc': 'explicit',
    'source.organizeImports': 'never',
  },
  'prettier.enable': false,
  'oxc.enable.oxlint': true,
  'oxc.enable.oxfmt': true,
  'oxc.typeAware': true,
}

const OXFMT_CONFIG = {
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns: ['**/dist/**', '**/node_modules/**'],
  singleQuote: true,
  semi: false,
  sortImports: {},
  sortPackageJson: true,
}

/**
 * Creates (or optionally overwrites) `.oxfmtrc.json` in the given directory.
 * Returns `true` if the file was written, `false` if skipped.
 * @param projectDir - The root directory of the project.
 * @param overwrite - Whether to overwrite an existing file without prompting.
 */
export function createOxfmtConfig(projectDir: string, overwrite: boolean): void {
  const configPath = path.join(projectDir, '.oxfmtrc.json')
  fs.writeFileSync(configPath, `${JSON.stringify(OXFMT_CONFIG, null, 2)}\n`, { encoding: 'utf-8' })
  consola.success(overwrite ? 'Overwrote .oxfmtrc.json' : 'Created .oxfmtrc.json')
}

/**
 * Returns `true` when `.oxfmtrc.json` already exists in the given directory.
 * @param projectDir - The root directory of the project.
 */
export function oxfmtConfigExists(projectDir: string): boolean {
  return fs.existsSync(path.join(projectDir, '.oxfmtrc.json'))
}
/**
 * Writes (or merges into) `.vscode/settings.json` with oxlint + oxfmt settings.
 * @param projectDir - The root directory of the project.
 */
export function setupVSCodeSettings(projectDir: string): void {
  const vscodeDir = path.join(projectDir, '.vscode')
  const settingsPath = path.join(vscodeDir, 'settings.json')

  if (!fs.existsSync(vscodeDir)) fs.mkdirSync(vscodeDir, { recursive: true })

  let existing: Record<string, unknown> = {}
  if (fs.existsSync(settingsPath)) {
    try {
      // oxlint-disable-next-line typescript/no-unsafe-assignment
      existing = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'))
    } catch {
      // ignore malformed JSON — overwrite
    }
  }

  const merged = { ...existing, ...VSCODE_SETTINGS }
  fs.writeFileSync(settingsPath, `${JSON.stringify(merged, null, 2)}\n`, { encoding: 'utf-8' })
  consola.success('Updated .vscode/settings.json')
}
