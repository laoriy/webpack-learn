/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-07 15:23:43
 * @Description: file content
 */
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const devConfig = {
    mode: "development",
    devServer: {
        contentBase: "./dist",
        open: true,
        hot: true,
        overlay: true,
    },
    devtool: "eval-cheap-module-source-map", // dev:eval-cheap-module-source-map ,pro:cheap-module-source-map
    optimization: {
        usedExports: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName:
                                    "[path][name]__[local]--[hash:base64:5]",
                            },
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
        ],
    },
    // 可以在webpack运行到某个时刻的时候，帮你做一些事情
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    output: {
        filename: "[name].js",
        // chunkFilename:"[name].chunk.js"
        publicPath: "",
    },
};

module.exports = merge(commonConfig, devConfig);
