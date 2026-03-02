# AGENTS.md

## Project Overview

**@schplitt/oxlint-config** is an opinionated [oxlint](https://oxc.rs/docs/guide/usage/linter) config package. It uses only oxlint's built-in plugins (no ESLint), exposes a `schplitt()` function API, and handles dynamic rule severity depending on whether the linter is running in an editor vs CLI/CI.

## Architecture

```
src/
├── index.ts           # Main entry: schplitt() function + named re-exports
├── types.ts           # Options interface, Severity/RuleConfig types
├── utils.ts           # isInEditorEnv(), isInGitHooksOrLintStaged(), sev()
├── globs.ts           # IGNORE_GLOBS, TS_FILES, glob constants
└── configs/
    ├── index.ts       # Re-exports all config modules
    ├── ignores.ts     # ignorePatterns() – returns merged ignore array
    ├── javascript.ts  # javascriptRules(isInEditor) – eslint/ namespace
    ├── typescript.ts  # typescriptRules(), typeAwareRules(isInEditor), typescriptOverrides()
    ├── node.ts        # nodeRules() – node/ namespace
    ├── imports.ts     # importRules() – import/ namespace
    ├── jsdoc.ts       # jsdocRules() – jsdoc/ namespace
    ├── unicorn.ts     # unicornRules() – unicorn/ namespace
    ├── oxc.ts         # oxcRules() – oxc/ namespace
    └── vitest.ts      # vitestRules() – vitest/ namespace
tests/
└── greet.test.ts      # Tests for schplitt() and all rule factories
oxlint.config.ts       # The package's own oxlint config (uses schplitt())
```

### Key files

**`src/index.ts`**

- Exports `schplitt(options)` as the default export
- Calls `defineConfig()` from `oxlint` with all composed rules
- Merges JS, TS, type-aware, node, import, jsdoc, unicorn, oxc, vitest rules
- Adds a TypeScript override that disables JS rules TypeScript handles natively
- Re-exports all rule factory functions for advanced consumers

**`src/types.ts`**

- `Options` – the public API options accepted by `schplitt()`
- `Severity`, `RuleConfig`, `RulesRecord` – shared types for rule maps

**`src/utils.ts`**

- `isInEditorEnv()` – detects VS Code / JetBrains / Vim/Neovim
- `sev(isInEditor)` – returns `'warn'` in editor, `'error'` in CLI
- `detectVitest(cwd)`, `detectAngular(cwd)`, `detectPnpmWorkspace(cwd)`, `detectVue(cwd)` – auto-detection helpers

**`src/configs/typescript.ts`**

- `typescriptRules()` – non-type-aware TS rules
- `typeAwareRules(isInEditor)` – type-aware rules (require `oxlint-tsgolint`)
- `typescriptOverrides()` – rules to turn off for TS files (applied via `overrides`)

## Built-in Plugins Used

| Plugin     | Enabled by default? | Purpose                        |
| ---------- | ------------------- | ------------------------------ |
| eslint     | Yes                 | Core JS rules                  |
| typescript | Yes                 | TS rules + type-aware rules    |
| unicorn    | Yes                 | High-quality opinionated rules |
| oxc        | Yes                 | Oxc-specific / deepscan rules  |
| import     | No (explicit)       | Import hygiene                 |
| node       | No (explicit)       | Node.js best practices         |
| jsdoc      | No (explicit)       | JSDoc quality (all warnings)   |
| vitest     | No (opt-in)         | Vitest test rules              |
| vue        | No (auto-detect)    | Vue SFC `<script>` block rules |

## Dynamic Severity

Several rules use `sev(isInEditor)` to produce `'warn'` in editors and `'error'` in CI/CLI:

- `prefer-const` (js)
- `no-unused-vars` (js)
- All `typescript/no-unsafe-*` rules (type-aware)
- `typescript/no-unsafe-enum-comparison` (type-aware)

## Development

```sh
pnpm install    # Install dependencies
pnpm test:run   # Run tests
pnpm build      # Build with tsdown
pnpm lint       # Lint with oxlint
pnpm typecheck  # TypeScript type checking
```

## Testing

- Write tests in `tests/`
- Use `*.test.ts` naming
- Run `pnpm test:run`
- Import from `../src`

## Maintaining Documentation

When making changes:

- **`AGENTS.md`** – Update with technical details, architecture, and best practices for AI agents
- **`README.md`** – Update with user-facing documentation (exported API, options, usage examples)

## Agent Guidelines

1. **Run tests** after making changes: `pnpm test:run`
2. **Run type checking**: `pnpm typecheck`
3. **Keep all exports in `src/index.ts`** – public API should be re-exported from the main entry
4. **Rule naming convention** – use `plugin/rule-name` format (e.g. `typescript/no-floating-promises`, not `@typescript-eslint/no-floating-promises`)
5. **No ESLint** – this package is oxlint-only; do not add ESLint dependencies
6. **No React** – react plugin is intentionally excluded
7. **No stylistic** – oxfmt will handle formatting in the future
8. **Record learnings** – Add project-specific gotchas to "Project Context & Learnings" section

## Project Context & Learnings

### Tools & Dependencies

- `oxlint` is the main dependency (peer). Config format: `oxlint.config.ts` using `defineConfig` from `oxlint`.
- `oxlint-tsgolint` is optional peer (for type-aware rules). Required when `options.typeAware: true`.
- Rule namespaces differ from ESLint: use `typescript/` not `@typescript-eslint/`, `node/` not `n/`, etc.
- Setting `plugins` in config **overwrites** the default set — always include all desired plugins.
- Type-aware rules are marked with 💭 in the oxlint rules list.

### Patterns & Conventions

- Each config module exports a function returning `RulesRecord` (plain object)
- `schplitt()` composes all rule records with spread syntax in one `defineConfig()` call
- TypeScript overrides (disabling JS rules for TS files) must go in `overrides[].files`
- `isInEditorEnv()` + `sev()` handle the dynamic severity pattern

### Common Mistakes to Avoid

- Do not use ESLint plugin names (e.g. `@typescript-eslint/`, `eslint-plugin-n`) — oxlint uses plain namespaces
- Do not add `oxc/no-const-enum` in `typescriptRules()` — it already lives in `oxcRules()`
- Do not forget to list all required plugins in the `plugins` array when calling `defineConfig()`
