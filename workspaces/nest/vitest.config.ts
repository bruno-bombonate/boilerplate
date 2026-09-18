import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  // Resolves the path aliases declared in tsconfig.json (including the ones
  // added by `nest g library`) using Vite's native resolver — needed instead of
  // the `vite-tsconfig-paths` plugin because the plugin resolves a `.js`-suffixed
  // alias specifier literally and fails to find the `.ts` source file.
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    // Transforms decorators (@Module, @Injectable, etc.) with metadata support —
    // Vite's default esbuild transform can't parse them.
    swc.vite({ module: { type: 'es6' } }),
  ],
  test: {
    globals: true,
    root: './',
    include: ['**/*.spec.ts'],
  },
});
