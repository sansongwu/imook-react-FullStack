const axios = require('axios')
const queryString = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  console.log('proxy收到请求')
  const path = req.path
  console.log(path)
  console.log(req.method)

  const user = req.session.user || {}// 判断是否登录使用的
  const needAccessToken = req.query.needAccessToken // 判断接口是否需要token
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken // 删除掉自己增加的params
  console.log(`${baseUrl}${path}`)
  console.log(queryString.stringify(Object.assign({}, req.body, {
    accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
  })))
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query, // 由于不知道是get 还是 post 请求 所以params 和 data 都写
    // 由于content-type 是formdata格式的 所以需要queryString转换格式
    // 转换前的格式是 {'accessToken: xxx'}
    // 转换后的格式是 ‘accessToken=xxx’
    data: queryString.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: { // 修改content-type
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => { // 把cnode的返回  返回给客户端
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    console.log('proxy-err')
    if (err.response) {
      res.status(500).send(err.response.data)
      return
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
