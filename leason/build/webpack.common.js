/*
 * @Author: liuruijun
 * @Date: 2020-11-05 10:02:41
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-05 17:46:21
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
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              // modules:{
              //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
              // }
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: {
          loader: "file-loader",
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
    splitChunks: {
      chunks: "all",
      minSize: 2,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name:'vender'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    // publicPath:'/'
  },
};
