/*
 * @Author: your name
 * @Date: 2020-11-17 09:06:38
 * @LastEditTime: 2020-11-17 19:33:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learn\bundler\bundler.js
 */
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const babel = require("@babel/core");

const moduleAnalsyer = (filename) => {
    const content = fs.readFileSync(filename, "utf-8"); // 读取文件
    const ast = parser.parse(content, { //1.内容生成ast
        sourceType: "module",
    });
    const dependencies = {};
    traverse(ast, {
        ImportDeclaration ({ node }) { //2.ast 分析import关系
            const dirname = path.dirname(filename);
            let newFile = "./" + path.join(dirname, node.source.value);
            dependencies[node.source.value] = newFile;
        },
    });
    const { code } = babel.transformFromAst(ast, null, {//从ast转成es5
        presets: ["@babel/preset-env"],
    });
    return {
        filename,
        dependencies, // 分析依赖 相对路径：绝对路径
        code, // ast 转es5
    };
};

const makeDependenciesGraph = (entry) => {
    const entryModule = moduleAnalsyer(entry)
    const graphArray = [entryModule]
    // 循环递归生成依赖图表
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i]
        const { dependencies } = item
        if (dependencies){
            for (let j in dependencies){
                graphArray.push(moduleAnalsyer(dependencies[j]))
            }
        }
    }
    const graph = {}
    graphArray.forEach(item=>{ // 数组转对象
        graph[item.filename] = {
            dependencies: item.dependencies,
            code:item.code
        }
    })

    return graph
}

const generateCode = (entry) => { // 生成可执行代码
    const graph = JSON.stringify(makeDependenciesGraph(entry));

    return `
        (function(graph){
            function require(module){
                function localRequire(relativePath){ // 递归，设置绝对路径
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code) // 执行代码
                })(localRequire,exports,graph[module].code)
                return exports
            };
            require('${entry}')
        })(${graph})
    `
}
const code = generateCode("./src/index.js")

console.log(code);

