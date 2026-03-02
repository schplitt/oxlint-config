import type { defineConfig } from 'oxlint'

export type OxlintConfig = ReturnType<typeof defineConfig>
export type Severity = 'error' | 'warn' | 'off'
export type RuleConfig = Severity | [Severity, ...unknown[]]
export type RulesRecord = Record<string, RuleConfig>

export interface Options {
  /**
   * Additional ignore patterns on top of the built-in ones.
   */
  ignores?: string[]

  /**
   * Enable type-aware rules (requires oxlint-tsgolint).
   * @default true
   */
  typeAware?: boolean

  /**
   * Enable vitest plugin rules.
   * Auto-detected when any `vitest.config.*` file is found in the file tree.
   * @default auto-detected
   */
  vitest?: boolean

  /**
   * Enable eslint-comments rules (via @eslint-community/eslint-plugin-eslint-comments JS plugin).
   * @default true
   */
  comments?: boolean

  /**
   * Enable Angular-specific TypeScript rules (via @angular-eslint JS plugin).
   * Auto-detected when `angular.json` is found in the file tree.
   * Template linting is not supported yet — oxlint does not support custom parsers.
   * @default auto-detected
   */
  angular?: boolean

  /**
   * Enable pnpm workspace rules.
   * Auto-detected when `pnpm-workspace.yaml` is found in the file tree.
   *
   * NOTE: Full eslint-plugin-pnpm linting (package.json / pnpm-workspace.yaml)
   * is not yet supported because oxlint does not support custom file parsers.
   * This option currently only controls detection-based activation.
   * @default auto-detected
   */
  pnpm?: boolean

  /**
   * Enable Vue rules (built-in `vue` plugin).
   * Auto-detected when any package with "vue" in its name is found in the nearest
   * `package.json` (dependencies / devDependencies / peerDependencies).
   *
   * Note: only rules that work on `<script>` blocks are supported.
   * Template linting is handled by oxlint's native Vue parser — no extra setup needed.
   * @default auto-detected
   */
  vue?: boolean

  /**
   * Enable YAML linting.
   * NOTE: Not supported yet — oxlint does not support custom file parsers.
   * This option is a stub for future compatibility.
   * @default false
   */
  yaml?: boolean

  /**
   * Enable JSON/JSONC linting.
   * NOTE: Not supported yet — oxlint does not support custom file parsers.
   * This option is a stub for future compatibility.
   * @default false
   */
  jsonc?: boolean

  /**
   * Enable Markdown linting.
   * NOTE: Not supported yet — oxlint does not support custom language/parser plugins.
   * This option is a stub for future compatibility.
   * @default false
   */
  markdown?: boolean
}
