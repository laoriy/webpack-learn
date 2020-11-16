const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const babel = require("@babel/core");

const moduleAnalsyer = (filename) => {
    const content = fs.readFileSync(filename, "utf-8");
    const ast = parser.parse(content, {
        sourceType: "module",
    });
    const depenrdencies = {};
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(filename);
            const newFile = "./" + path.join(dirname, node.source.value);
            depenrdencies[node.source.value] = newFile;
        },
    });
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"],
    });
    return {
        filename,
        depenrdencies, // 分析依赖相对路径：绝对路径
        code, // ast 转es5
    };
};
const data = moduleAnalsyer("./src/index.js");
console.log(data);
