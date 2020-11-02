/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-02 17:10:39
 * @Description: file content
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 打包结束后会自动生成一个html文件，并将打包生成的js自动引入
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.(png|jpg|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        //placeholder 占位符
                        name:'[name]_[hash].[ext]',
                        outputPath:'imgs/',
                        limit:2048
                    }
                }
            },
            {
                test:/\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:2,
                            // modules:{
                            //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            // }
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
        ]
    },
    // 可以在webpack运行到某个时刻的时候，帮你做一些事情
    plugins:[
        new HtmlWebpackPlugin({
            template:'src/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}