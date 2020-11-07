/*
 * @Author: liuruijun
 * @Date: 2020-11-05 10:02:41
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-07 17:51:03
 * @Description: file content
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包结束后会自动生成一个html文件，并将打包生成的js自动引入
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  target: ["web", "es5"],
  entry: {
    // main:'./src/index.js',
    // sub: "./src/console.js",
    split: "./src/codeSpilt.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            //placeholder 占位符
            name: "[name]_[hash].[ext]",
            outputPath: "imgs/",
            limit: 2048,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: {
          loader: "file-loader",
          options:{
            outputPath: 'font/'
          }
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist")
  },
};
