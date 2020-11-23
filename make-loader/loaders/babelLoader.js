const { validate } = require("schema-utils");
const babelSchema = require("./babelSchema.json");
const babel = require("@babel/core");
const util = require("util");
//babel.transform 用来编译代的方法
// 是一个普通的异步方法
//  util.promisify将其转换成promise的异步方法
const transform = util.promisify(babel.transform);

module.exports = function (content, map, meta) {
    const options = this.getOptions(true) || {};
    // 检验options是否合法
    validate(babelSchema, options, {
        name: "babelLoader",
    });

    // 异步loader
    const callback = this.async();
    transform(content, options)
        .then(({ code, map }) => callback(null, code, map, meta))
        .catch((err) => callback(err));
};
