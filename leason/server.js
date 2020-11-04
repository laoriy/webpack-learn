/*
 * @Author: liuruijun
 * @Date: 2020-11-04 09:37:45
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-04 09:57:29
 * @Description: file content
 */
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const compiler = webpack(config)

const app = express()

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))


app.listen(8099,()=>{
  console.log('serve is listening on port 8099!\n')
})