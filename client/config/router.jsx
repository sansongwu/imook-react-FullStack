import React from 'react'
import {
  Route,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'

export default () => [
  <Route path="/" component={TopicList} exact />, // exact 完整匹配才显示当前路由内容
  <Route path="/detail" component={TopicDetail} />,
]
