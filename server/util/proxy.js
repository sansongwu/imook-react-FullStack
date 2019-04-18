const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}// 判断是否登录使用的
  const needAccessToken = req.query.needAccessToken // 判断接口是否需要token
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query)
  if (query.needAccessToken) delete query.needAccessToken // 删除掉自己增加的params

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query, // 由于不知道是get 还是 post 请求 所以params 和 data 都写
    data: Object.assign({}, req.body, {
      accesstoken: user.accessToken
    }),
    headers: { // 修改content-type
      'Content-Type': 'application/x-www-form-urlencode'
    }
  }).then(resp => { // 把cnode的返回  返回给客户端
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
