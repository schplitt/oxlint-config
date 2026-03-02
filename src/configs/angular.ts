import type { RulesRecord } from '../types'
import { sev } from '../utils'

/**
 * JS plugin spec for @angular-eslint/eslint-plugin.
 * This plugin operates on TypeScript files — no custom parser needed.
 * Angular template linting is NOT supported yet (oxlint has no custom parser API).
 */
export const angularJsPlugin = {
  name: 'angular',
  specifier: '@angular-eslint/eslint-plugin',
} as const

/**
 * Angular-specific TypeScript rules.
 * Covers component/directive/service/pipe best practices.
 * @param isInEditor - Whether the linter is currently running inside an editor.
 */
export function angularRules(isInEditor: boolean): RulesRecord {
  return {
    'angular/contextual-lifecycle': 'error',
    'angular/no-empty-lifecycle-method': 'error',
    'angular/no-input-rename': 'error',
    'angular/no-inputs-metadata-property': 'error',
    'angular/no-output-native': 'error',
    'angular/no-output-on-prefix': 'error',
    'angular/no-output-rename': 'error',
    'angular/no-outputs-metadata-property': 'error',
    'angular/prefer-inject': 'error',
    'angular/prefer-standalone': 'error',
    'angular/prefer-signal-model': 'error',
    'angular/prefer-signals': 'error',
    'angular/sort-keys-in-type-decorator': 'error',
    'angular/sort-lifecycle-methods': 'error',
    'angular/use-component-selector': 'error',
    'angular/use-injectable-provided-in': sev(isInEditor),
    'angular/use-lifecycle-interface': 'error',
    'angular/use-pipe-transform-interface': 'error',
  }
}
