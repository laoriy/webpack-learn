/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-08 10:48:02
 * @Description: file content
 */
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const prodConfig = {
  mode: "production",
//   devtool: "cheap-module-source-map",
  module:{
     rules:[
        {
           test: /\.scss$/,
           use: [
              MiniCssExtractPlugin.loader,
              {
                 loader: "css-loader",
                 options: {
                    importLoaders: 2,
                    modules:{
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    }
                 },
              },
              "postcss-loader",
              "sass-loader",
           ],
        },
        {
           test: /\.css$/,
           use: [
              MiniCssExtractPlugin.loader,
              {
                 loader: "css-loader",
                 options: {
                    importLoaders: 1,
                 },
              },
              "postcss-loader",
           ],
        }
     ]
  },
   optimization: {
      minimizer: [
         new CssMinimizerPlugin(),
      ]
   },
  plugins: [
     new MiniCssExtractPlugin({
        filename:'[name].css',
        chunkFilename:'[name].chunk.css'
     })
   ],
   performance:false,
   output: {
      filename: "[name].[contenthash].js",
      chunkFilename:"[name].[contenthash].js"
   },
};

module.exports = merge(commonConfig, prodConfig)
