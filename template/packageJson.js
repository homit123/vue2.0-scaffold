module.exports = `{
  "name": "PROJECTNAME",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development node server.js",
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.conf.js --progress --hide-modules",
    "dll": "cross-env NODE_ENV=production webpack --config build/webpack.dll.conf.js --progress --hide-modules"
  },
  "author": "davy",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.18.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-plugin-transform-object-assign": "^6.22.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "cross-env": "^5.1.4",
    "css-loader": "^0.28.11",
    "element-ui": "^2.3.2",
    "es6-promise": "^4.2.4",
    "extract-text-webpack-plugin": "^3.0.2",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "happypack": "^4.0.1",
    "html-webpack-plugin": "^3.1.0",
    "koa": "^2.5.0",
    "koa-static": "^4.0.2",
    "koa-webpack-dev-middleware": "^2.0.2",
    "koa-webpack-hot-middleware": "^1.0.3",
    "node-sass": "^4.7.2",
    "sass-loader": "^6.0.7",
    "style-loader": "^0.20.3",
    "uglifyjs-webpack-plugin": "^1.2.4",
    "url-loader": "^1.0.1",
    "vue": "^2.5.16",
    "vue-loader": "^14.2.1",
    "vue-router": "^3.0.1",
    "vue-style-loader": "^4.1.0",
    "vue-template-compiler": "^2.5.16",
    "vuex": "^3.0.1",
    "vuex-router-sync": "^5.0.0",
    "webpack": "^3.5.5",
    "webpack-merge": "^4.1.2"
  }
}


`