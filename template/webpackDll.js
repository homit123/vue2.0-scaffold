module.exports = `const webpack = require('webpack');

const path = require("path");
const vendors = [
  "vue/dist/vue.runtime.common.js", 
  "vue-router/dist/vue-router.common.js",
  "vuex", 
  "vuex-router-sync", 
  "element-ui",
  "lodash", 
  "axios"
];

module.exports = {
  resolve: {
		extensions: [".js", ".vue"]
	},
  entry: {
    vendor: vendors,
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: '[name].js',
    library: '[name]',
  },

  plugins: [
     new webpack.DllPlugin({
         context: __dirname,
         name: "[name]",
         path: path.join(__dirname, "manifest.json"),
       }),
     new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],
};`