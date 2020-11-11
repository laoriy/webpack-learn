/*
 * @Author: your name
 * @Date: 2020-11-05 10:02:41
 * @LastEditTime: 2020-11-11 09:23:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learn\leason\build\webpack.common.js
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包结束后会自动生成一个html文件，并将打包生成的js自动引入
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const fs = require('fs')
const webpack = require('webpack')

const makePlugins = (configs) => {
    const plugins = []
    const entrys = Object.keys(configs.entry)
    const files = fs.readdirSync(path.resolve(__dirname, '../dll'))

    plugins.push(new CleanWebpackPlugin() )
    files.forEach(file => {
        if(/.*\.dll.js/.test(file)){
            plugins.push(new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname, '../dll',file) }))
        }
        if (/.*\.manifest.json/.test(file)) {
            plugins.push(new webpack.DllReferencePlugin({ manifest: path.resolve(__dirname, '../dll', file) }))
        }
    })
    entrys.forEach(item=>{
        plugins.push(
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: `${item}.html`,
                chunks: ['runtime', 'vendors', item],
            })
        )
    })
    return plugins
}

const configs  = {
    target: ["web", "es5"],
    entry: {
        // main:'./src/index.js',
        sub: "./src/console.js",
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
        publicPath: "../dist/",
    },
};

configs.plugins = makePlugins(configs)

module.exports = configs