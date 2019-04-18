const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const favicon = require('serve-favicon')
const express = require('express')
const ReactSSR = require('react-dom/server')


const isDev = process.env.NODE_ENV === 'development';

const app = express()

app.use(bodyParser.json()) // 在application的数据挂载到request.body上
app.use(bodyParser.urlencoded({ extended: false })) // 其他请求方式的数据也挂载到request.body上？

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid', // session 会放一个cocki id 放在浏览器端
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode' // 用该字符串加密coocki
}))

app.use(favicon(path.join(__dirname, '../favicon.ico'))) // 设置favicon的请求地址

/* 拦截请求 */
app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))
app.use('/mega', require('./util/megaProxy'))

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
