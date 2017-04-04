import BowerWebpackPlugin from "bower-webpack-plugin"
import path from "path"


let isProduction = global.isProduction;
let devtool = isProduction ? null : "#source-map";


export default {

  entry: {
    app: "./src/js/app.js"
  },

  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].bundle.js"
  },

  devtool,

  resolve: {
    root: [
      path.join(__dirname, "bower_components"),
      path.join(__dirname, "node_modules")
    ],
    moduleDirectories: [
      "bower_components",
      "node_modules"
    ],
    extensions: ["", ".js", ".jsx", ".webpack.js", ".web.js"]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader?optional[]=runtime&stage=0"
      }
    ]
  },

  plugins: [
    new BowerWebpackPlugin()
  ]
};