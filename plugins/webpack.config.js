/*
 * @Author: your name
 * @Date: 2020-11-11 23:34:36
 * @LastEditTime: 2020-11-16 17:51:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learn\plugins\webpack.config.js
 */
const CopyrightWebpackPlugin = require("./plugins/copyright-webpack-plugin");
const Plugin1 = require("./plugins/plugin1");
const Plugin2 = require("./plugins/plugin2");
const CopyWebpackPlugin = require("./plugins/CopyWebpackPlugin");

const path = require("path");
module.exports = {
    entry: {
        main: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    plugins: [
        new CopyrightWebpackPlugin({ name: "laor" }),
        new Plugin1(),
        new Plugin2(),
        new CopyWebpackPlugin({
            from: "public",
            to: "css",
            ignore: ["**/index.html"],
        }),
    ],
};
