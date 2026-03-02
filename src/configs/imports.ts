import type { RulesRecord } from '../types'

/**
 * Import plugin rules (import/ namespace in oxlint).
 * Mirrors the original eslint-plugin-import-lite preset.
 */
export function importRules(): RulesRecord {
  return {
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-empty-named-blocks': 'error',
  }
}
