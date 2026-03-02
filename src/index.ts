import { defineConfig } from 'oxlint'

import {
  angularJsPlugin,
  angularRules,
  commentsJsPlugin,
  commentsRules,
  ignorePatterns,
  importRules,
  javascriptRules,
  jsdocRules,
  nodeRules,
  oxcRules,
  typeAwareRules,
  typescriptOverrides,
  typescriptRules,
  unicornRules,
  vitestRules,
  vueRules,
} from './configs'
import { TS_FILES } from './globs'
import type { Options } from './types'
import { detectAngular, detectVitest, detectVue, isInEditorEnv } from './utils'

/**
 * Create an oxlint config with sensible opinionated defaults.
 *
 * @example
 * ```ts
 * // oxlint.config.ts
 * import schplitt from '@schplitt/oxlint-config'
 * export default schplitt()
 * ```
 *
 * @example
 * ```ts
 * // oxlint.config.ts
 * import schplitt from '@schplitt/oxlint-config'
 * export default schplitt({
 *   vitest: true,
 *   angular: true,
 *   ignores: ['generated/**'],
 * })
 * ```
 * @param options - Configuration options for the oxlint config.
 */
export function schplitt(options: Options = {}) {
  const {
    typeAware = true,
    ignores = [],
    comments = true,
    yaml: _yaml, // stub — not yet supported by oxlint custom parsers
    jsonc: _jsonc, // stub — not yet supported by oxlint custom parsers
    markdown: _markdown, // stub — not yet supported by oxlint custom parsers
  } = options

  const isInEditor = isInEditorEnv()

  // ── Auto-detection ────────────────────────────────────────────────────────

  // vitest: honour explicit boolean; otherwise auto-detect from vitest.config.*
  const resolvedVitest = options.vitest !== undefined ? !!options.vitest : detectVitest()

  // pnpm: detect for informational purposes only
  // NOTE: pnpm JSON/YAML file linting not yet supported (oxlint has no custom parser API)
  // TODO: Enable pnpm-specific rules when oxlint supports custom file parsers
  // const _resolvedPnpm = (options.pnpm !== undefined ? !!options.pnpm : detectPnpmWorkspace())

  // angular: honour explicit boolean; otherwise auto-detect from angular.json
  const resolvedAngular = options.angular !== undefined ? !!options.angular : !!detectAngular()

  // vue: honour explicit boolean; otherwise auto-detect from package.json deps containing 'vue'
  const resolvedVue = options.vue !== undefined ? !!options.vue : detectVue()

  // ── Plugins ───────────────────────────────────────────────────────────────

  // ── JS plugins (ESLint-compatible plugins that work without custom parsers) ─

  const jsPlugins = [
    ...(comments ? [commentsJsPlugin] : []),
    ...(resolvedAngular ? [angularJsPlugin] : []),
  ]

  // ── Overrides ─────────────────────────────────────────────────────────────

  const overrides = [
    {
      // TypeScript files: disable JS rules that TypeScript already catches
      files: [...TS_FILES],
      rules: typescriptOverrides(),
    },
  ]

  return defineConfig({
    plugins: [
      'eslint',
      'typescript',
      'unicorn',
      'oxc',
      'import',
      'node',
      'jsdoc',
      ...(resolvedVitest ? (['vitest'] as const) : []),
      ...(resolvedVue ? (['vue'] as const) : []),
    ],

    ...(jsPlugins.length > 0 ? { jsPlugins } : {}),

    options: {
      typeAware,
    },

    env: {
      browser: true,
      builtin: true,
      es2024: true,
      node: true,
    },

    ignorePatterns: ignorePatterns(ignores),

    rules: {
      ...javascriptRules(isInEditor),
      ...typescriptRules(),
      ...importRules(),
      ...nodeRules(),
      ...jsdocRules(),
      ...unicornRules(),
      ...oxcRules(),
      ...(comments ? commentsRules() : {}),
      ...(resolvedVitest ? vitestRules() : {}),
      ...(resolvedAngular ? angularRules(isInEditor) : {}),
      ...(resolvedVue ? vueRules() : {}),
      ...(typeAware ? typeAwareRules(isInEditor) : {}),
    },

    overrides,
  })
}

export default schplitt

// Named re-exports for consumers who want to compose rules themselves
export {
  angularJsPlugin,
  angularRules,
  commentsJsPlugin,
  commentsRules,
  importRules,
  javascriptRules,
  jsdocRules,
  nodeRules,
  oxcRules,
  typeAwareRules,
  typescriptOverrides,
  typescriptRules,
  unicornRules,
  vitestRules,
  vueRules,
} from './configs'

export { detectAngular, detectPnpmWorkspace, detectVue, detectVitest, isInEditorEnv } from './utils'

export type { Options } from './types'
