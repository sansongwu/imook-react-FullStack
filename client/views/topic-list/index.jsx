import React from 'react'
import axios from 'axios'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'

import AppState from '../../store/app-state'

const test = () => {
  console.log('click')
  axios('mega/2/getUserInfo?mega_id=M5129308&platform=universal')
}

@inject('appState') // 注入store  该组件用了哪个store 就注入哪个
@observer // 数据更新 组件也更新
class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this) // 给方法绑定this
  }

  componentDidMount () {
    // do something
  }

  changeName(event) {
    // this.props.appState.name = event.target.value 不推荐这么写 要用action
    this.props.appState.changeName(event.target.value)
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
        <button type="button" onClick={test}>test</button>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired, // 是AppState的实例  / 必须传入
}

export default TopicList
