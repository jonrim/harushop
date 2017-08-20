const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base');
const indexPath = path.join(__dirname, '../', 'client', 'src', 'index.html')
const path = require('path')

module.exports = Object.assign({}, baseConfig, {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './client/src/app.js'
  ],
  plugins: baseConfig.plugins.concat([
    new HtmlWebpackPlugin({
      inject: true,
      template: indexPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.DAB_DB': JSON.stringify(process.env.DAB_DB)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      minimize: true,
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ])
})