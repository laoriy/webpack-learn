/*
 * @Author: your name
 * @Date: 2020-11-11 23:34:36
 * @LastEditTime: 2020-11-16 17:51:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learn\plugins\webpack.config.js
 */
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
const path = require('path')
module.exports = {
  entry:{
    main:'./src/inddex.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js'
  },
  plugins:[
    new CopyrightWebpackPlugin({name:'laor'})
  ]
}