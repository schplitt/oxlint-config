# @schplitt/oxlint-config

My opinionated [oxlint](https://oxc.rs/docs/guide/usage/linter) config. TypeScript, Node, imports, JSDoc, Unicorn, Oxc, and Vue rules — batteries included.

> **Formatting:** Stylistic rules are intentionally excluded. This package installs and configures [oxfmt](https://github.com/oxc-project/oxfmt) alongside oxlint — the CLI will write a `.oxfmtrc.json` for you.

## Quick setup

Run the CLI to install dependencies, generate `oxlint.config.ts` and `.oxfmtrc.json`, add scripts to `package.json`, and optionally configure VS Code:

```sh
pnpm dlx @schplitt/oxlint-config
```

## Manual setup

Install dependencies:

```sh
pnpm add -D oxlint oxfmt @schplitt/oxlint-config
```

Create `oxlint.config.ts` in your project root:

```ts
import schplitt from '@schplitt/oxlint-config'
export default schplitt()
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "lint": "oxlint && oxfmt --check",
    "lint:fix": "oxlint --fix && oxfmt --write"
  }
}
```

## Options

```ts
export default schplitt({
  // Enable type-aware rules (default: true, requires oxlint-tsgolint)
  typeAware: true,

  // Enable vitest rules — auto-detected from vitest.config.* (default: auto)
  vitest: true,

  // Enable Angular TS rules via @angular-eslint — auto-detected from angular.json (default: auto)
  angular: true,

  // Enable Vue rules (built-in vue plugin) — auto-detected from package.json deps (default: auto)
  vue: true,

  // Enable eslint-comments rules (default: true)
  comments: true,

  // Additional ignore patterns on top of the built-ins
  ignores: ['generated/**', 'vendor/**'],

  // Stubs — no-op until oxlint supports custom file parsers
  yaml: false,
  jsonc: false,
  markdown: false,
  pnpm: false,
})
```

## Advanced — composing rule factories

All rule sets are exported as standalone functions for consumers who need fine-grained control:

```ts
import { defineConfig } from 'oxlint'
import {
  javascriptRules,
  typescriptRules,
  typeAwareRules,
  nodeRules,
  importRules,
  jsdocRules,
  unicornRules,
  oxcRules,
  vitestRules,
  isInEditorEnv,
} from '@schplitt/oxlint-config'

const isInEditor = isInEditorEnv()

export default defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'node', 'jsdoc', 'vitest'],
  options: { typeAware: true },
  rules: {
    ...javascriptRules(isInEditor),
    ...typescriptRules(),
    ...typeAwareRules(isInEditor),
    ...nodeRules(),
    ...importRules(),
    ...jsdocRules(),
    ...unicornRules(),
    ...oxcRules(),
    ...vitestRules(),
    // your overrides
    'unicorn/prefer-node-protocol': 'off',
  },
})
```

## Not supported

The following features are **not yet supported** because oxlint does not have a custom file parser/language API:

| Feature                                        | Reason                                 |
| ---------------------------------------------- | -------------------------------------- |
| YAML linting                                   | Requires `yaml-eslint-parser`          |
| JSON / JSONC linting                           | Requires `jsonc-eslint-parser`         |
| Markdown linting                               | Requires a custom language plugin      |
| `pnpm-workspace.yaml` / `package.json` linting | Requires both a YAML and a JSON parser |
| Angular template linting                       | Requires `parserAngularTemplate`       |
| Vue template linting                           | Requires a custom Vue template parser  |

> **Vue script support:** The `vue` option enables oxlint's built-in `vue` plugin, which lints `<script>` blocks in `.vue` SFCs natively. Only template linting is unsupported.

These options exist as stubs (`yaml`, `jsonc`, `markdown`, `pnpm`) and will be wired up once oxlint gains parser support.

## Inspiration

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [@nkzw/oxlint-config](https://github.com/nkzw-tech/oxlint-config)

## License

MIT
