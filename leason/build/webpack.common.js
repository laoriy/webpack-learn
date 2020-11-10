/*
 * @Author: your name
 * @Date: 2020-11-05 10:02:41
 * @LastEditTime: 2020-11-10 20:55:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learn\leason\build\webpack.common.js
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包结束后会自动生成一个html文件，并将打包生成的js自动引入
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack')

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
                    options: {
                        outputPath: "font/",
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new AddAssetHtmlPlugin({ filepath: require.resolve('../dll/vendors.dll.js') }),
        new CleanWebpackPlugin(),
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'../dll/vendors.manifest.json')
        })
    ],
    optimization: {
        runtimeChunk: "single",
        moduleIds: "deterministic",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
    },
};
