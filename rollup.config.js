/* eslint-env node */
import { join } from "path";
import alias from '@rollup/plugin-alias';
import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    alias({
      entries: {
        "@": join(__dirname, 'src'),
      }
    }),
    svelte({
      dev: !production,
      preprocess: preprocess({
        postcss: {
          extract: true,
          plugins: [
            autoprefixer(),
          ],
        },
      }),
      css: css => {
        css.write('public/bundle.css')
      },
    }),


    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
