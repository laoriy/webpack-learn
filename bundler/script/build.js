const myWebpack = require("../lib/myWebpack/index");
const config = require("../config/webpack.config");

const compiler = myWebpack(config);
// 開始打包webpack
compiler.run();
