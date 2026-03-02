import type { RulesRecord } from '../types'

/**
 * JS plugin spec for @eslint-community/eslint-plugin-eslint-comments.
 * Pass this into the top-level `jsPlugins` array to activate the plugin.
 */
export const commentsJsPlugin = {
  name: 'eslint-comments',
  specifier: '@eslint-community/eslint-plugin-eslint-comments',
} as const

/**
 * Disable-comment hygiene rules.
 * Catches unused `oxlint-disable` directives and unlimited disables.
 */
export function commentsRules(): RulesRecord {
  return {
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-duplicate-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',
  }
}
