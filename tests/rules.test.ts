import { expect, test, describe, expectTypeOf } from 'vitest'

import schplitt, {
  isInEditorEnv,
  javascriptRules,
  typescriptRules,
  typeAwareRules,
  nodeRules,
  importRules,
  jsdocRules,
  unicornRules,
  oxcRules,
  vitestRules,
} from '../src'

describe('schplitt()', () => {
  test('returns a valid oxlint config object with default options', () => {
    const config = schplitt()
    expect(config).toBeDefined()
    expectTypeOf(config).toBeObject()
    expect(config.plugins).toContain('typescript')
    expect(config.plugins).toContain('unicorn')
    expect(config.plugins).toContain('oxc')
    expect(config.plugins).toContain('import')
    expect(config.plugins).toContain('node')
    expect(config.plugins).toContain('jsdoc')
    expect(config.plugins).toContain('vitest')
  })

  test('enables typeAware by default', () => {
    const config = schplitt()
    expect(config.options?.typeAware).toBeTruthy()
  })

  test('can disable typeAware', () => {
    const config = schplitt({ typeAware: false })
    expect(config.options?.typeAware).toBeFalsy()
  })

  test('enables vitest plugin when requested', () => {
    const config = schplitt({ vitest: true })
    expect(config.plugins).toContain('vitest')
  })

  test('merges user ignores into ignore patterns', () => {
    const config = schplitt({ ignores: ['generated/**', 'vendor/**'] })
    expect(config.ignorePatterns).toContain('generated/**')
    expect(config.ignorePatterns).toContain('vendor/**')
    expect(config.ignorePatterns).toContain('**/node_modules')
  })

  test('always includes node_modules in ignore patterns', () => {
    const config = schplitt()
    expect(config.ignorePatterns).toContain('**/node_modules')
    expect(config.ignorePatterns).toContain('**/dist')
  })

  test('includes TypeScript override for TS files', () => {
    const config = schplitt()
    expect(config.overrides).toBeDefined()
    expect(config.overrides?.length).toBeGreaterThan(0)
    const tsOverride = config.overrides?.[0]
    expect(tsOverride?.files).toContain('**/*.ts')
  })

  test('rules object is populated', () => {
    const config = schplitt()
    expect(config.rules).toBeDefined()
    expectTypeOf(config.rules).toBeObject()
  })
})

describe('isInEditorEnv()', () => {
  test('returns a boolean', () => {
    expectTypeOf(isInEditorEnv()).toBeBoolean()
  })

  test('returns false in CI environments', () => {
    const original = process.env.CI
    process.env.CI = 'true'
    expect(isInEditorEnv()).toBeFalsy()
    process.env.CI = original
  })
})

describe('rule factories', () => {
  test('javascriptRules returns an object with error rules', () => {
    const rules = javascriptRules(false)
    expectTypeOf(rules).toBeObject()
    expect(rules['no-var']).toBe('error')
    expect(rules['no-eval']).toBe('error')
  })

  test('javascriptRules uses warn for prefer-const in editor', () => {
    const editorRules = javascriptRules(true)
    const cliRules = javascriptRules(false)
    const editorEntry = editorRules['prefer-const']
    const cliEntry = cliRules['prefer-const']
    const editorSev = Array.isArray(editorEntry) ? editorEntry[0] : editorEntry
    const cliSev = Array.isArray(cliEntry) ? cliEntry[0] : cliEntry
    expect(editorSev).toBe('warn')
    expect(cliSev).toBe('error')
  })

  test('typescriptRules returns consistent-type-imports rule', () => {
    const rules = typescriptRules()
    expect(rules['typescript/consistent-type-imports']).toBeDefined()
  })

  test('typeAwareRules uses warn for unsafe rules in editor', () => {
    const editorRules = typeAwareRules(true)
    const cliRules = typeAwareRules(false)
    expect(editorRules['typescript/no-unsafe-assignment']).toBe('warn')
    expect(cliRules['typescript/no-unsafe-assignment']).toBe('error')
  })

  test('nodeRules returns node/no-deprecated-api', () => {
    const rules = nodeRules()
    expect(rules['node/no-deprecated-api']).toBe('error')
  })

  test('importRules returns import/no-duplicates', () => {
    const rules = importRules()
    expect(rules['import/no-duplicates']).toBe('error')
  })

  test('jsdocRules returns warn-severity rules', () => {
    const rules = jsdocRules()
    expect(rules['jsdoc/check-access']).toBe('warn')
  })

  test('unicornRules has correctness rules', () => {
    const rules = unicornRules()
    expect(rules['unicorn/no-empty-file']).toBe('error')
    expect(rules['unicorn/prefer-node-protocol']).toBe('error')
  })

  test('oxcRules has oxc-specific rules', () => {
    const rules = oxcRules()
    expect(rules['oxc/no-const-enum']).toBe('error')
    expect(rules['oxc/no-accumulating-spread']).toBe('error')
  })

  test('vitestRules has vitest correctness rules', () => {
    const rules = vitestRules()
    expect(rules['vitest/no-conditional-tests']).toBe('error')
  })
})
