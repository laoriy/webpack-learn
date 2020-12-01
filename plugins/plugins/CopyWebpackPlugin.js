const { validate } = require("schema-utils");
const globby = require("globby");
const shcema = require("./schema.json");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const webpack = require("webpack");
const { Compilation } = require("webpack");
const { RawSource } = webpack.sources;

class CopyWebpackPlugin {
    constructor(options = {}) {
        // 验证options
        validate(shcema, options, {
            name: "CopyWebpackPlugin",
        });
        this.options = options;
    }
    apply(compiler) {
        // 初始化compilation
        compiler.hooks.thisCompilation.tap(
            "CopyWebpackPlugin",
            (compilation) => {
                // 在添加资源的hooks
                compilation.hooks.additionalAssets.tapAsync(
                    "CopyWebpackPlugin",
                    async (cb) => {
                        
                        // 将from中的资源复制到to中，输出出去
                        const { from, ignore } = this.options;
                        const to = this.options.to ? this.options.to : ".";


                        // 1.读取from所有资源

                        // globby(要处理的文件夹，options)
                        const paths = await globby(from, {
                            // 所有要加载的文件
                            ignore,
                        });


                        // 2.读取path中的文件

                        //context就是webpack的配置
                        //运行指令的目录
                        const context = compiler.options.context; // 默认process.cwd()

                        const files = await Promise.all(
                            paths.map(async (pathName) => {
                                // 将输入的路径变换为绝对路径
                                pathName = path.isAbsolute(pathName)
                                    ? pathName
                                    : path.resolve(context, pathName);
                                // 读取文件
                                const data = await readFile(pathName);

                                // 得到最后的文件名称
                                const relativePath = path.basename(pathName);
                                const fileName = path.join(to, relativePath);

                                return {
                                    //文件数据
                                    data,
                                    // 文件名称
                                    fileName,
                                };
                            })
                        );

                        // 3.生成webpack的格式的资源
                        const assets = files.map((file) => {
                            const source = new RawSource(file.data);
                            return {
                                source,
                                fileName: file.fileName,
                            };
                        });

                        // 4.添加到compilation中输出出去
                        assets.forEach((asset) => {
                            compilation.emitAsset(asset.fileName, asset.source);
                        });
                        cb();
                    }
                );
            }
        );
    }
}

module.exports = CopyWebpackPlugin;
