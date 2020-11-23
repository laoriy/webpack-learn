const path = require("path");
module.exports = {
    mode: "development",
    entry: {
        main: "./src/index.js",
    },
    resolveLoader: {
        modules: ["node_modules", "./loaders"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // use: [
                //     "replaceLoader.js",
                //     {
                //         loader: "replaceLoaderAsync.js",
                //         options: {
                //             name: "lassasdfs",
                //             age: "20",
                //         },
                //     },
                // ],
                loader: "babelLoader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
};
