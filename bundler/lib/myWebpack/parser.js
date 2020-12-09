const fs = require("fs");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require('@babel/core')
const path = require('path')

const parser = {
  // 将文件解析成ast
  getAst (filePath){
    // 读取文件
    const file = fs.readFileSync(filePath, "utf-8");

    //将其解析成ast抽象语法树@babel/parser
    const ast = babelParser.parse(file, {
      sourceType: "module", // 解析文件的模块化方案是 ES Module
    });
    return ast
  },
  // 获取依赖
  getDeps (ast,filePath){
    //获取文件的文件夹路径
    const dirname = path.dirname(filePath)
    // 存储依赖的容器
    const deps = {}

    traverse(ast, {
      //内部会遍历ast中program.body并且判断语句类型
      // 如果type = ImportDeclaration 就会触发当前函数
      ImportDeclaration ({ node }) {
        // 文件相对路径 './add.js
        const relativePath = node.source.value
        // 文件绝对路径
        const absolutePath = path.resolve(dirname, relativePath)
        // 添加依赖
        deps[relativePath] = absolutePath
      },
    });
    return deps
  },
  // 奖ast解析成code
  getCode(ast){
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }

}

module.exports = parser