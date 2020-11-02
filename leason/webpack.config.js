/*
 * @Author: liuruijun
 * @Date: 2020-11-02 08:49:22
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-11-02 09:36:11
 * @Description: file content
 */
const path = require('path')

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
                        outputPath:'assets/',
                        limit:2048
                    }
                }
            },
            {
                test:/\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader','postcss-loader']
            }
        ]
    }
}