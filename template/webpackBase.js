module.exports = `const path = require("path");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpack = require("webpack");

const isProd = process.env.NODE_ENV === "production";

const dist = isProd
    ? path.resolve(__dirname, "../dist")
    : path.resolve(__dirname, "../");

var entry = {
    app: "./src/entry-client.js"
};

module.exports = {
    devtool: isProd
        ? false
        : "#cheap-module-eval-source-map",
    entry: isProd
        ? entry
        : Object.assign(entry, { hot: ["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000"] }),

    output: {
        path: dist,
        publicPath: "/",
        filename: "js/[name].js",
        chunkFilename: "js/[name].e.js"
    },
    resolve: {
        mainFields: [
            'jsnext:main', 'main'
        ],
        extensions: [
            ".js", ".json", ".vue"
        ],
        alias: {
            happypack: path.resolve("../node_modules/happypack"),
            "@": path.resolve(__dirname, "../src"), //指向src
        }
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true //css压缩
                        }
                    }, 'sass-loader'],
                })
            }, {
                test: /\.vue$/,
                loader: 'happypack/loader?id=vue'
            }, {
                test: /\\.(eot|svg|ttf|woff|woff2)(\\?\\S*)?$/,
                loader: "file-loader"

            },
            {
                test: /\.(js)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\\.(png|jpg|gif|svg)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "[name].[ext]?[hash]"
                }
            }
        ]
    },
    plugins: isProd
        ? [new ExtractTextPlugin('app.css')]
        : [
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsPlugin(),
            new ExtractTextPlugin('app.css')
        ]
};

`