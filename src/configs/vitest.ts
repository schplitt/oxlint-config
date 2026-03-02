import type { RulesRecord } from '../types'

/**
 * Vitest plugin rules (vitest/ namespace in oxlint).
 * Only included when `vitest: true` is passed to schplitt().
 */
export function vitestRules(): RulesRecord {
  return {
    // ── Correctness ──────────────────────────────────────────────────────────
    'vitest/consistent-each-for': 'error',
    'vitest/no-conditional-tests': 'error',
    'vitest/hoisted-apis-on-top': 'error',
    'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
    'vitest/warn-todo': 'warn',

    // ── Style ─────────────────────────────────────────────────────────────────
    'vitest/consistent-test-filename': 'error',
    'vitest/consistent-vitest-vi': 'error',
    'vitest/no-import-node-test': 'error',
    'vitest/prefer-called-once': 'error',
    'vitest/prefer-called-times': 'error',
    'vitest/prefer-to-be-falsy': 'error',
    'vitest/prefer-to-be-truthy': 'error',
    'vitest/prefer-to-be-object': 'error',
    'vitest/prefer-expect-type-of': 'error',
    'vitest/prefer-import-in-mock': 'error',
    'vitest/prefer-describe-function-title': 'error',
  }
}
