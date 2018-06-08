module.exports = `const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const HTMLPlugin = require('html-webpack-plugin')
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const manifest = require(path.resolve(__dirname, 'manifest.json'))
const config = merge(base, {
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '.'),
            manifest: manifest,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new UglifyJsPlugin(),
        new HTMLPlugin({
            template: 'src/index.template.html',
            hash: true,
            inject: false,
            title: "项目脚手架",
            dll: \`./\${manifest.name}.js\`,
            css: ['app.css','ui.css'],
            js: base.entry,
            // 版本号迭代 手动控制
            version: "1.0"
        }),
        new webpack.ContextReplacementPlugin(/\\.\\/locale$/, 'empty-module', false, /js$/),
    ]
})
module.exports = config
`