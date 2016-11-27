var _ = require("lodash");
var path = require("path");
var argv = require("yargs").argv;
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var context = path.join(__dirname, "src");
var build = path.join(__dirname, "build");
var exclude = /node_modules|bower_components/;

/**
 * If environment is not defined then check if it is not passed by argument.
 * Environment is passed by arguments because windows and unix handled environment
 * variables differently.
 */
if (_.isUndefined(process.env.NODE_ENV)) {
  process.env.NODE_ENV = argv.production ? "production" : "development";
}

/**
 * If api host environment is not defined and api mock param is set then
 * set api host environment as swagger host.
 */
if (_.isUndefined(process.env.API_HOST)) {

  var LOGIN_EDGE_PORT = "9001";
  var ACCOUNT_EDGE_PORT = "9002";
  var CATALOG_EDGE_PORT = "9003";
  var RATINGS_EDGE_PORT = "9004";

  var LOGIN_EDGE_IP, ACCOUNT_EDGE_IP, CATALOG_EDGE_IP, RATINGS_EDGE_IP;

  process.env.API_HOST = "http://127.0.0.1";

  switch (process.env.NODE_ENV) {
    case "development":
      // on develop we use the host ip and the port, no need to specify ip for edge services
      LOGIN_EDGE_IP = ACCOUNT_EDGE_IP = CATALOG_EDGE_IP = RATINGS_EDGE_IP = "";
      break;
    case "production":
      // TODO configure edge service ip's when AWS setup is done
      LOGIN_EDGE_IP = "";
      ACCOUNT_EDGE_IP = "";
      CATALOG_EDGE_IP = "";
      RATINGS_EDGE_IP = "";
      break;
  }

  if (argv.zuul) {
    LOGIN_EDGE_PORT = ACCOUNT_EDGE_PORT = CATALOG_EDGE_PORT = RATINGS_EDGE_PORT = "9000";
  }

  if (argv.mock || process.env.npm_config_mock) {
    process.env.LOGIN_EDGE = process.env.ACCOUNT_EDGE = process.env.CATALOG_EDGE = process.env.RATINGS_EDGE = "http://127.0.0.1:10010";
  } else {
    process.env.LOGIN_EDGE = LOGIN_EDGE_IP + ":" + LOGIN_EDGE_PORT;
    process.env.ACCOUNT_EDGE = ACCOUNT_EDGE_IP + ":" + ACCOUNT_EDGE_PORT;
    process.env.CATALOG_EDGE = CATALOG_EDGE_IP + ":" + CATALOG_EDGE_PORT;
    process.env.RATINGS_EDGE = RATINGS_EDGE_IP + ":" + RATINGS_EDGE_PORT;
  }
}

module.exports = {
  context: context,
  entry: "index.js",
  output: {
    path: build,
    filename: "build.js"
  },
  externals: [
    {"window": "window"},
    {"document": "document"}
  ],
  resolve: {
    modulesDirectories: ["node_modules", "bower_components"],
    extensions: ["", ".js", ".json"],
    root: [context]
  },
  devtool: "source-map",
  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint-loader", exclude: exclude}
    ],
    loaders: [
      {test: /\.js$/, exclude: exclude, loader: "ng-annotate?add=true!babel?stage=1&optional=runtime"},
      {test: /\.html$/, loader: "html"},
      {test: /\.eot|ttf|woff|woof2|svg/, loader: "file"},
      {test: /\.css/, loader: ExtractTextPlugin.extract("style", "css?sourceMap")},
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
              // activate source maps via loader query
              'css?sourceMap!' +
              'sass?sourceMap'
          )
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
    postLoaders: [{
      test: /\.js$/,
      exclude: /(test|node_modules)\//,
      loader: 'isparta'
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV", "API_HOST", "LOGIN_EDGE", "ACCOUNT_EDGE", "CATALOG_EDGE", "RATINGS_EDGE"]),
    // use jquery as a global because some libraries like bootstrap expects it to be global
    new webpack.ProvidePlugin({jQuery: "jquery"}),
    new HtmlWebpackPlugin({filename: "index.html", template: path.join(context, "index.tpl.html")}),
    new ExtractTextPlugin("stylesheet.css", {allChunks: true})
  ]
};
