import type { RulesRecord } from '../types'

/**
 * Node.js plugin rules (node/ namespace in oxlint).
 * Mirrors the original eslint-plugin-n preset.
 */
export function nodeRules(): RulesRecord {
  return {
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-deprecated-api': 'error',
    'node/no-exports-assign': 'error',
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
    'node/prefer-global/buffer': ['error', 'never'],
    'node/prefer-global/process': ['error', 'never'],
    'node/process-exit-as-throw': 'error',
  }
}
