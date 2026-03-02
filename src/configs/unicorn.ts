import type { RulesRecord } from '../types'

/**
 * Unicorn plugin rules (unicorn/ namespace in oxlint, enabled by default).
 * Selectively enables high-signal rules; avoids overly pedantic ones.
 */
export function unicornRules(): RulesRecord {
  return {
    // ── Correctness ──────────────────────────────────────────────────────────
    'unicorn/no-await-in-promise-methods': 'error',
    'unicorn/no-empty-file': 'error',
    'unicorn/no-new-array': 'error',
    'unicorn/no-single-promise-in-promise-methods': 'error',
    'unicorn/no-thenable': 'error',
    'unicorn/no-useless-fallback-in-spread': 'error',
    'unicorn/no-useless-length-check': 'error',
    'unicorn/no-useless-spread': 'error',
    'unicorn/no-unnecessary-await': 'error',
    'unicorn/prefer-set-size': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',

    // ── Suspicious ───────────────────────────────────────────────────────────
    'unicorn/no-accessor-recursion': 'error',
    'unicorn/consistent-function-scoping': 'warn',
    'unicorn/no-array-reverse': 'error',
    'unicorn/no-array-sort': 'error',
    'unicorn/no-instanceof-builtins': 'error',

    // ── Style / Quality ───────────────────────────────────────────────────────
    'unicorn/catch-error-name': 'error',
    'unicorn/error-message': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-invalid-fetch-options': 'error',
    'unicorn/no-invalid-remove-event-listener': 'error',
    'unicorn/no-typeof-undefined': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-class-fields': 'error',
    'unicorn/prefer-dom-node-append': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-regexp-test': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-structured-clone': 'error',
    'unicorn/throw-new-error': 'error',
  }
}
