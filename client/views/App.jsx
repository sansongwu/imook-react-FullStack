import React from 'react'

import {
  Link,
} from 'react-router-dom' // Link 标签处理router的跳转
import Routes from '../config/router'

// export default () => {
//   return (
//     <div>This is app</div>
//   )
// }

export default class App extends React.Component { // react组件 就是一个class
  componentDidMount() {
    // do something here
  }

  render() { // 组件必须有render方法  代表要渲染组件的时候 生成怎样的html代码
    return [
      <div>
        <Link to="/">首页</Link>
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes />,
    ]
  }
}
