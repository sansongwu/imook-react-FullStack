const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
  console.log(req.body)
  console.log('login收到请求')
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken
  }).then(resp => {
    if (resp.status === 200 && resp.data.success) {
      req.session.user = { // 这不知道干嘛呢
        accessToken: req.body.accessToken,
        loginName: resp.data.loginname,
        id: resp.data.id,
        avatarUrl: resp.data.avatar_url
      }
      res.json({
        success: true,
        data: resp.data
      })
    }
  }).catch(err => {
    console.log('login-err')
    if (err.response) { // 错误 但是返回内容了
      res.json({
        success: false,
        data: err.response.data // 这里response本身非常的大 无法转换成字符串 所以只转换res.data
      })
    } else {
      next(err)
    }
  })
})

module.exports = router;
