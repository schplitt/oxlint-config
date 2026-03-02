import type { RulesRecord } from '../types'
import { sev } from '../utils'

/**
 * Core ESLint rules (eslint/ plugin in oxlint).
 * Mirrors the original ESLint javascript preset with dynamic severity.
 * @param isInEditor - Whether the linter is currently running inside an editor.
 */
export function javascriptRules(isInEditor: boolean): RulesRecord {
  return {
    // ── Accessor & Class ────────────────────────────────────────────────────
    'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],
    'constructor-super': 'error',
    'no-class-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-this-before-super': 'error',
    'no-useless-constructor': 'error',

    // ── Array & Object ──────────────────────────────────────────────────────
    'array-callback-return': 'error',
    'no-array-constructor': 'error',
    'no-sparse-arrays': 'error',

    // ── Async & Promise ─────────────────────────────────────────────────────
    'no-async-promise-executor': 'error',
    'no-promise-executor-return': 'error',
    'prefer-promise-reject-errors': 'error',

    // ── Best Practices ──────────────────────────────────────────────────────
    'block-scoped-var': 'error',
    'default-case-last': 'error',
    eqeqeq: ['error', 'smart'],
    'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],
    'no-alert': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-iterator': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-proto': 'error',
    'no-prototype-builtins': 'error',
    'no-return-assign': 'error',
    'no-self-assign': ['error', { props: true }],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'prefer-object-has-own': 'error',

    // ── Case & Switch ────────────────────────────────────────────────────────
    'no-case-declarations': 'error',
    'no-duplicate-case': 'error',
    'no-fallthrough': 'error',

    // ── Console & Debugging ──────────────────────────────────────────────────
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',

    // ── Control Flow ─────────────────────────────────────────────────────────
    'no-cond-assign': ['error', 'always'],
    'no-constant-binary-expression': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unsafe-optional-chaining': 'error',

    // ── Declaration ──────────────────────────────────────────────────────────
    'no-const-assign': 'error',
    'no-delete-var': 'error',
    'no-redeclare': ['error', { builtinGlobals: false }],
    'no-shadow-restricted-names': 'error',
    'no-undef': 'error',
    'no-var': 'error',
    'prefer-const': [sev(isInEditor), { destructuring: 'all', ignoreReadBeforeAssign: true }],
    'vars-on-top': 'error',

    // ── Empty & Whitespace ────────────────────────────────────────────────────
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-irregular-whitespace': 'error',
    'no-unexpected-multiline': 'error',
    'unicode-bom': ['error', 'never'],

    // ── Expression ────────────────────────────────────────────────────────────
    'no-extra-boolean-cast': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTaggedTemplates: true, allowTernary: true },
    ],

    // ── Function ──────────────────────────────────────────────────────────────
    'no-func-assign': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',

    // ── Global & Native ───────────────────────────────────────────────────────
    'no-global-assign': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-obj-calls': 'error',
    'no-restricted-globals': [
      'error',
      { message: 'Use `globalThis` instead.', name: 'global' },
      { message: 'Use `globalThis` instead.', name: 'self' },
    ],

    // ── Import ────────────────────────────────────────────────────────────────
    'no-import-assign': 'error',

    // ── Math & Number ─────────────────────────────────────────────────────────
    'no-compare-neg-zero': 'error',
    'no-loss-of-precision': 'error',
    'prefer-exponentiation-operator': 'error',
    'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],

    // ── Object ────────────────────────────────────────────────────────────────
    'no-dupe-keys': 'error',

    // ── Regex ─────────────────────────────────────────────────────────────────
    'no-control-regex': 'error',
    'no-invalid-regexp': 'error',
    'no-misleading-character-class': 'error',
    'no-regex-spaces': 'error',
    'no-useless-backreference': 'error',

    // ── String ────────────────────────────────────────────────────────────────
    'no-template-curly-in-string': 'error',
    'prefer-template': 'error',

    // ── Symbol ────────────────────────────────────────────────────────────────
    'symbol-description': 'error',

    // ── Try/Catch ─────────────────────────────────────────────────────────────
    'no-ex-assign': 'error',

    // ── Type Checking ─────────────────────────────────────────────────────────
    'valid-typeof': ['error', { requireStringLiterals: true }],

    // ── Unused ────────────────────────────────────────────────────────────────
    // warn in editor so the experience stays comfortable, error in CI/CLI
    'no-unused-vars': [
      sev(isInEditor),
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],

    // ── Variable Usage ────────────────────────────────────────────────────────
    'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
  }
}
