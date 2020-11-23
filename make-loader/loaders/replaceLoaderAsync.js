const { validate } = require("schema-utils");
const schema = require("./schema.json");
module.exports = function (source) {
    const options = this.getOptions(true);
    // 检验options是否合法
    validate(schema, options, {
        name: "replaceLoaderAsync",
    });
    const callback = this.async();
    const result = source.replace("hello", "lsss");
    setTimeout(() => {
        callback(null, result);
    }, 100);
};
