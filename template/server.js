module.exports = `const Koa = require("koa"),
path = require("path"),
serve = require("koa-static"),
convert = require("koa-convert"),
webpack = require("webpack"),
app = new Koa();

var webpackConfig = require("./build/webpack.conf");

var compiler = webpack(webpackConfig);

const devMiddleware = require("koa-webpack-dev-middleware");
const hotMiddleware = require("koa-webpack-hot-middleware");

app.use(
devMiddleware(compiler, {
  publicPath: "/",
  // stats: "errors-only",
  quiet: true
})
);
app.use(
hotMiddleware(compiler, {
  log: console.log,
  path: "/__webpack_hmr",
  heartbeat: 10 * 1000
})
);

app.use(serve(__dirname+ "/dist",{ extensions: ['html']}));
var port = 4008;
app.listen(port, function() {
console.log("----------------");
console.log(\` ---> Server running on port: \${port}\`);
});
`