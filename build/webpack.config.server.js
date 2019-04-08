const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server_entry.js')  // 绝对路径 比较保险  __dirname当前文件的绝对路径
    },
    output: {
        filename: 'server_entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '',  // 加在script标签引用js的路径前面的  用来区分url是静态资源 或者CDN前缀
        libraryTarget: 'commonjs2' // 打包出来的js的模块配置方案
    }
})
