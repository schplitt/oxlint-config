import type { RulesRecord } from '../types'
import { sev } from '../utils'

/**
 * TypeScript plugin rules (non-type-aware).
 * Note: In oxlint, these are under the `typescript/` namespace.
 * Several JS rules are turned off here because TypeScript handles them better.
 */
export function typescriptRules(): RulesRecord {
  return {
    // ── Disable JS rules that TypeScript makes redundant ────────────────────
    // (Applied globally; the TS-files override further tightens these)
    'no-undef': 'off',

    // ── TypeScript rules ────────────────────────────────────────────────────
    'typescript/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
    'typescript/consistent-type-definitions': ['error', 'interface'],
    'typescript/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      },
    ],
    'typescript/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
    'typescript/no-import-type-side-effects': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-wrapper-object-types': 'error',
    'typescript/triple-slash-reference': 'off',
    'typescript/no-this-alias': 'error',
    'typescript/no-extra-non-null-assertion': 'error',
    'typescript/no-non-null-asserted-optional-chain': 'error',
    'typescript/no-unsafe-declaration-merging': 'error',
    'typescript/no-duplicate-enum-values': 'error',
    'typescript/no-useless-empty-export': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-namespace-keyword': 'error',

    // ── Erasable syntax (no runtime cost) ──────────────────────────────────
    // Bans syntax that requires transformation (not erasable by tsc --verbatimModuleSyntax)
    // oxc/no-const-enum is added via oxcRules()
    'typescript/no-namespace': 'error',
    'typescript/parameter-properties': 'error',
  }
}

/**
 * Type-aware TypeScript rules.
 * These require `options.typeAware: true` and oxlint-tsgolint.
 * Unsafe rules use dynamic severity (warn in editor, error in CLI).
 * @param isInEditor - Whether the linter is currently running inside an editor.
 */
export function typeAwareRules(isInEditor: boolean): RulesRecord {
  return {
    'typescript/await-thenable': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-for-in-array': 'error',
    'typescript/no-implied-eval': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-unnecessary-type-assertion': 'error',
    'typescript/no-meaningless-void-operator': 'error',
    'typescript/no-array-delete': 'error',
    'typescript/no-base-to-string': 'error',
    'typescript/no-redundant-type-constituents': 'error',
    'typescript/no-unsafe-unary-minus': 'error',
    'typescript/unbound-method': 'error',
    'typescript/require-array-sort-compare': 'error',
    'typescript/restrict-template-expressions': 'error',
    'typescript/no-misused-spread': 'error',

    // These can be noisy in the editor – downgrade to warnings
    'typescript/no-unsafe-argument': sev(isInEditor),
    'typescript/no-unsafe-assignment': sev(isInEditor),
    'typescript/no-unsafe-call': sev(isInEditor),
    'typescript/no-unsafe-member-access': sev(isInEditor),
    'typescript/no-unsafe-return': sev(isInEditor),
    'typescript/no-unsafe-enum-comparison': sev(isInEditor),
    'typescript/promise-function-async': 'error',
    'typescript/restrict-plus-operands': 'error',
    'typescript/return-await': ['error', 'in-try-catch'],
    'typescript/switch-exhaustiveness-check': 'error',
    'typescript/no-unnecessary-type-parameters': 'error',
    'typescript/prefer-nullish-coalescing': 'error',
  }
}

/**
 * Rules to turn off in TypeScript files because TypeScript itself catches them.
 * Applied via overrides targeting *.ts / *.tsx / *.mts / *.cts.
 */
export function typescriptOverrides(): RulesRecord {
  return {
    'constructor-super': 'off',
    'getter-return': 'off',
    'no-class-assign': 'off',
    'no-const-assign': 'off',
    'no-dupe-class-members': 'off',
    'no-implied-eval': 'off',
    'no-redeclare': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'no-undef': 'off',
  }
}
