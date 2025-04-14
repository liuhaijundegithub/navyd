import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';


export default defineConfig({
  input: {
    main: 'src/main.ts',
    tabs: 'src/components/tabs/Tabs.tsx',
    modal: 'src/components/modal/Modal.tsx',
    layer: 'src/components/layer/Layer.tsx',
    button: 'src/components/button/Button.tsx',
    drawer: 'src/components/drawer/Drawer.tsx'
  },
  output: [
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      assetFileNames: 'assets/[name][extname]',
      plugins: [terser()]
    }
  ],
  external: ['react', 'react-dom', 'antd', 'react-router-dom'],
  plugins: [
    del({ targets: 'dist/*', verbose: true }),
    nodeResolve({ browser: true }),
    json(),
    commonjs({
      requireReturnsDefault: 'auto'
    }),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    alias({
      // resolve: [".js", ".tsx", ".jsx", "ts"],
      resolve: ['.js']
    }),
    postcss({
      extensions: ['.less', '.css'],
      use: ['less'],
      extract: 'css/index.css'
    }),
    babel(),
    image(),
    copy({
      targets: [
        { src: 'src/types', dest: 'dist' },
        { src: 'src/iconfont', dest: 'dist' }
      ]
    })
  ]
});
