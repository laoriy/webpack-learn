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
            }
        ]
    }
}