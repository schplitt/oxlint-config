/**
 * Files and directories to always ignore during linting.
 */
export const IGNORE_GLOBS = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.nitro',
  '**/.next',
  '**/.svelte-kit',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',
  '**/vite.config.*.timestamp-*',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',

  // Coding-agent skill folders (https://github.com/vercel-labs/skills)
  '**/.github/skills/**',
  '**/.agents/skills/**',
  '**/.agent/skills/**',
  '**/.augment/rules/**',
  '**/.claude/skills/**',
  '**/.cline/skills/**',
  '**/.cursor/skills/**',
  '**/.windsurf/skills/**',
  '**/.copilot/skills/**',
] as const

/** TypeScript source files */
export const TS_GLOB = '**/*.?([cm])ts'
export const TSX_GLOB = '**/*.?([cm])tsx'

/** All JS/TS source files */
export const COMPLETE_JS_TS_GLOB = '**/*.?([cm])[jt]s?([x])'

/** TypeScript file patterns for overrides */
export const TS_FILES = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] as const
