const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const { terser } = require('rollup-plugin-terser')
//__dirname是获取当前命令执行的目录，即项目的路径 
const inputPath = path.resolve(__dirname, './src/index.js')
const outputPath = path.resolve(__dirname, './dist/datav.min.js')
const outputPath2 = path.resolve(__dirname, './dist/datav.es.min.js')
// console.log(inputPath);

//node默认commonJS模块化标准
module.exports = {
  // 配置入口文件路径
  input: inputPath,
  //配置出口文件路径
  output: [{
    //输出路径
    file: outputPath,
    //输出的模块协议
    format: 'umd',
    //必须指定模块名称
    name: 'Datav',
    globals: {
      vue: 'Vue'
    }
  }, {
    //输出路径
    file: outputPath2,
    //输出的模块协议
    format: 'es',
    //必须指定模块名称
    name: 'Datav',
    globals: {
      vue: 'Vue'
    }
  }],
  plugins: [
    vue(),
    resolve(),
    commonjs(),
    babel({
      //不需要进行babel编译的文件
      exclude: 'node_modules/**'
    }),
    json(),
    postcss({
      plugins: []
    }),
    //压缩文件
    terser()
  ],
  external: ['Vue']
}