import type { RulesRecord } from '../types'

/**
 * JSDoc plugin rules (jsdoc/ namespace in oxlint).
 * All as warnings — jsdoc issues are advisory, not blocking.
 */
export function jsdocRules(): RulesRecord {
  return {
    'jsdoc/check-access': 'warn',
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-property-names': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/implements-on-classes': 'warn',
    'jsdoc/no-defaults': 'warn',
    'jsdoc/no-multi-asterisks': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-property': 'warn',
    'jsdoc/require-property-description': 'warn',
    'jsdoc/require-property-name': 'warn',
    'jsdoc/require-returns-description': 'warn',
  }
}
