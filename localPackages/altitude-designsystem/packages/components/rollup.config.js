const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const postcssEasyImport = require("postcss-easy-import")
const { externals } = require('rollup-plugin-node-externals')

module.exports = {
  input: './src/index.js',
  output: {
    file: './build/index.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve({ extensions: ['.js', '.jsx'] }),
    commonjs(),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env', '@babel/preset-react'] }),
    postcss({
      plugins: [
        postcssEasyImport({
          extensions: ['.scss']
        })
      ]
    }),
    externals()
  ]
}
