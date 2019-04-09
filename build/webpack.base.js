const path = require('path')

module.exports = {
  module: {
    rules: [ // rules里配置loader
        {
            enforce: 'pre',
            test: /.(js|jsx)$/,
            loader: 'eslint-loader',
            exclude: [
                path.resolve(__dirname, '../node_modules')
            ]
        },
        {
            test: /.jsx$/,
            loader: 'babel-loader'
        },
        {
            test: /.js$/,
            loader: 'babel-loader', // jsx和js文件用babel-loader编译
            exclude: [
                path.join(__dirname, '../node_modules')
            ]
        }
    ]
  }
}
