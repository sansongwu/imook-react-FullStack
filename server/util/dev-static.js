const path = require('path')

const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs') // 读取内存中的文件的包
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')

const serverConfig = require('../../build/webpack.config.server')

// 获取template
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        // 服务是webpack-devServer在本地8888起的 从这里去获取html
        axios.get('http://localhost:8888/public/index.html')
        .then(res => {
            resolve(res.data)
        })
        .catch(reject)
    })
}

const Module = module.constructor // 通过module的构造函数 创建module

let serverBundle // 创建全局变量

const mfs = new MemoryFs
// 获取
// 启动一个 compiler
const serverCompiler = webpack(serverConfig)
//指定 serverCompiler的output 这样之后 就可以从内存读取bundle了
serverCompiler.outputFileSystem = mfs // webpack提供的配置项 以前通过fs读写的文件 现在都通过mfs读写
// 监听entry的文件是不是有变化 有变化重新打包
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    // stats 是webpack打包后输出的内容 信息
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    //服务端 bundle 的路径
    const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
    // 读取bundle文件 string类型
    const bundle = mfs.readFileSync(bundlePath, 'utf-8') // 是string内容 不是模块
    const m = new Module()
    m._compile(bundle, 'server-entry.js') // 动态编译模块要写上文件名
    serverBundle = m.exports.default // 拿到模块的default
})


module.exports = function (app) {
    // 将静态文件代理到 8888端口上
    app.use('/public',  proxy({
        target: 'http://localhost:8888'
    }))
    app.get('*', function (req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle) // 其实服务端渲染主要就是执行这句话 然后插入html并返回
            res.send(template.replace('<!-- app -->', content))
        })
    })
}