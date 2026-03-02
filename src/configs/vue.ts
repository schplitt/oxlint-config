import type { RulesRecord } from '../types'

/**
 * Rules for the built-in `vue` plugin.
 * Covers `.vue` SFC script blocks — template linting is handled natively by oxlint's Vue parser.
 * No extra JS plugin is required; add `'vue'` to the `plugins` array in `defineConfig`.
 */
export function vueRules(): RulesRecord {
    return {
        // ── Correctness ──────────────────────────────────────────────────────────
        'vue/no-arrow-functions-in-watch': 'error',
        'vue/no-deprecated-destroyed-lifecycle': 'error',
        'vue/no-export-in-script-setup': 'error',
        'vue/no-import-compiler-macros': 'error',
        'vue/no-lifecycle-after-await': 'error',
        'vue/no-this-in-before-route-enter': 'error',
        'vue/prefer-import-from-vue': 'error',
        'vue/valid-define-emits': 'error',
        'vue/valid-define-props': 'error',

        // ── Suspicious ───────────────────────────────────────────────────────────
        'vue/no-required-prop-with-default': 'warn',
        'vue/require-default-export': 'warn',

        // ── Style ─────────────────────────────────────────────────────────────────
        'vue/define-emits-declaration': 'warn',
        'vue/define-props-declaration': 'warn',
        'vue/define-props-destructuring': 'warn',
        'vue/require-typed-ref': 'warn',

        // ── Restriction (off by default — too opinionated) ────────────────────────
        'vue/max-props': 'off',
        'vue/no-multiple-slot-args': 'off',
    }
}
