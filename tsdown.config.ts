import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'cli/index': './src/cli/index.ts',
  },
  target: ['es2024'],
  format: 'esm',
  clean: true,
  dts: true,
  outDir: './dist',
  inlineOnly: ['citty', 'consola', 'pathe', 'tinyexec', 'nypm'],
})
