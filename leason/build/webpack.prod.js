/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-07 15:36:06
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
     new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
     }),
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
