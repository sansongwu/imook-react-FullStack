/* eslint-disable */
/* 把App.js放到views后 eslint就报错 不知道为什么 */
import React from 'react' // App里已经import React 了  这里还要import一遍 不知道为什么  2-4 14分20有讲
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'

import appState from './store/app-state'

// 使用router 一定要用BrowserRouter标签把app内容包裹起来
ReactDOM.render(
  <Provider appState={ appState }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
) // 把App组件挂载到body节点上 官方推荐挂载到body下的一个节点上
