/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-05 11:00:25
 * @Description: file content
 */
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  plugins: [
     new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
     })
    ]
};

module.exports = merge(commonConfig, prodConfig)
