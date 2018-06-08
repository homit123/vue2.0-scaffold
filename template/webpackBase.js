module.exports = `const path = require("path");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ExtractApp = new ExtractTextPlugin("app.css");
var ExtractUi = new ExtractTextPlugin("ui.css");

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
        : {app:["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", "./src/entry-client.js"]},

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
            "basePage": path.resolve(__dirname, "../src/modules/basePage.js"), //指向src
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ExtractApp.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            minimize: true,
                            importLoaders: 1,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    }
                })
            }, {
                test: /.scss$/,
                use: ExtractUi.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }
                    ]
                })
            }, {
                test: /.vue$/,
                loader: 'vue-loader',
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: "file-loader"

            }, {
                test: /.(js)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "[name].[ext]?[hash]"
                }
            }
        ]
    },
    plugins: isProd
        ? [ExtractApp, ExtractUi]
        : [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new FriendlyErrorsPlugin(),
            ExtractApp,
            ExtractUi
        ]
};

`