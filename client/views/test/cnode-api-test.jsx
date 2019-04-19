import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class CNodeApiTest extends React.Component {
  topicList() {
    axios.get('/api/topics')
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  login() {
    axios.post('/api/user/login', {
      accessToken: '6807b51a-3eb2-40ff-8bff-63d3a361235e'
    })
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  mark() {
    axios.post('/api/message/mark_all?needAccessToken=true')
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.topicList} type="topicList">topicList</button>
        <button onClick={this.login} type="login">login</button>
        <button onClick={this.mark} type="mark">mark</button>
      </div>
    )
  }
}
/* eslint-enable */
