# imook-react-FullStack
慕课网react全栈视频项目

#npm脚本
构建命令
"build:client": "webpack --config build/webpack.config.client.js"
"build:server": "webpack --config build/webpack.config.server.js"
"clear": "rimraf dist"
"build": "npm run clear && npm run build:client && npm run build:server"

开发启动命令
"dev:client": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js"
"dev:server": "cross-env NODE_ENV=development node server/server.js"

git hook
"lint": "eslint --ext .js --ext .jsx client/"
"precommit": "npm run lint"

#分支说明
master: 开发实例项目的主分支
ssr_release: 发布react ssr webpack配置 的分支，方便将来开发使用
