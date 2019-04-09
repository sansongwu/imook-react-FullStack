const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development' // 在启动node的时候配置

const config = webpackMerge(baseConfig, {
    entry: {
        app: path.join(__dirname, '../client/app.js')  // 绝对路径 比较保险  __dirname当前文件的绝对路径
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public'  // 加在script标签引用js的路径前面的  用来区分url是静态资源 或者CDN前缀
    },
    plugins: [
        new HtmlWebpackPlugin({ // 生成一个html页面 webapck编译的时候 把生成的文件注入到这个html里
            template: path.join(__dirname, '../client/template.html')
        })
    ]
})

if (isDev) {
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public', // 访问dist目录下的内容路径都增加 ./public前缀
        historyApiFallback: {
            index: '/public/index.html' // 所有404的请求 都返回该html
        }
    }
}

module.exports = config
