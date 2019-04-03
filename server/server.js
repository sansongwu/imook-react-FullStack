const fs = require('fs')
const path = require('path')

const express = require('express')
const ReactSSR = require('react-dom/server')


const isDev = process.env.NODE_ENV === 'development';

const app = express()

if (!isDev) {
    const serverEntry = require('../dist/server_entry').default // 服务端代码在 serverEntry 里    .default见简书3-7
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
    // 由于get * 返回index.html js 也返回这个了 所以 给静态文件指定对应的请求返回 静态文件映射到dist上
    app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.get('*', function (req, res) {
        const appString = ReactSSR.renderToString(serverEntry)
        res.send(template.replace('<!-- app -->', appString)) // 把app标签替换成 服务端渲染的内容
    })
} else {
    // 开发阶段
    const devStatic = require('./util/dev-static')
    devStatic(app)
}


app.listen(3333, function () {
    console.log('server start on 3333')
    console.log(process.env.NODE_ENV)
})
