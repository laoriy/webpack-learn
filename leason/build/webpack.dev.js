/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-05 15:26:32
 * @Description: file content
 */
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: "development",
  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true
  },
  devtool: "eval-cheap-module-source-map", // dev:eval-cheap-module-source-map ,pro:cheap-module-source-map
  optimization: {
    usedExports: true,
  },
  // 可以在webpack运行到某个时刻的时候，帮你做一些事情
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};

module.exports = merge(commonConfig,devConfig)
