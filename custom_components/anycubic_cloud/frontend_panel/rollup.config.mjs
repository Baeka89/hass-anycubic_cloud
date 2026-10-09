import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  onwarn(warning, warn) {
    if (['UNRESOLVED_IMPORT', 'MISSING_GLOBAL_NAME'].includes(warning.code)) {
      throw new Error(warning.message);
    }
    warn(warning);
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    typescript({ noEmit: false, allowImportingTsExtensions: false }),
    json(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
    }),
  ],
  input: 'src/anycubic-cloud-panel.ts',
  output: {
    dir: 'dist',
    format: 'iife',
    name: 'AnycubicCloud',
    sourcemap: false
  },
  context: 'window',
  preserveEntrySignatures: 'strict',
};