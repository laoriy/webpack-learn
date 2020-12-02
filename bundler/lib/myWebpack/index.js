const fs = require("fs");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function myWebpack(config) {
    return new Complier(config);
}

class Complier {
    constructor(options = {}) {
        this.options = options;
    }
    //启动webpack打包
    run() {
        // 1. 读取入口文件内容
        //入口文件路径
        const filePath = this.options.entry;
        const file = fs.readFileSync(filePath, "utf-8");

        // 2. 将其解析成ast抽象语法树@babel/parser
        const ast = babelParser.parse(file, {
            sourceType: "module", // 解析文件的模块化方案是 ES Module
        });
        // debugger;
        console.log(ast);

        // 3.收集依赖@babel/traverse
        traverse(ast, {
            //内部会遍历ast中program.body并且判断语句类型
            // 如果type = ImportDeclaration 就会触发当前函数
            ImportDeclaration(code) {
                debugger;
                console.log(code);
            },
        });
    }
}

module.exports = myWebpack;
