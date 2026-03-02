import type { RulesRecord } from '../types'

/**
 * Oxc-specific rules (oxc/ namespace in oxlint, enabled by default).
 * These are rules unique to oxlint / ported from deepscan.
 */
export function oxcRules(): RulesRecord {
  return {
    // ── Correctness ──────────────────────────────────────────────────────────
    'oxc/bad-array-method-on-arguments': 'error',
    'oxc/bad-char-at-comparison': 'error',
    'oxc/bad-comparison-sequence': 'error',
    'oxc/bad-min-max-func': 'error',
    'oxc/bad-object-literal-comparison': 'error',
    'oxc/bad-replace-all-arg': 'error',
    'oxc/const-comparisons': 'error',
    'oxc/double-comparisons': 'error',
    'oxc/erasing-op': 'error',
    'oxc/missing-throw': 'error',
    'oxc/number-arg-out-of-range': 'error',
    'oxc/only-used-in-recursion': 'error',
    'oxc/uninvoked-array-callback': 'error',

    // ── Suspicious ───────────────────────────────────────────────────────────
    'oxc/approx-constant': 'error',
    'oxc/misrefactored-assign-op': 'error',
    'oxc/no-async-endpoint-handlers': 'error',
    'oxc/no-this-in-exported-function': 'error',

    // ── Erasable TypeScript syntax ────────────────────────────────────────────
    'oxc/no-const-enum': 'error',

    // ── Perf ─────────────────────────────────────────────────────────────────
    'oxc/no-accumulating-spread': 'error',
    'oxc/no-map-spread': 'error',
  }
}
