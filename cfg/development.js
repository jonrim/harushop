const webpack = require('webpack');
const baseConfig = require('./base');

module.exports = Object.assign({}, baseConfig, {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/src/app.js'
  ],
  plugins: baseConfig.plugins.concat([
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.DAB_DB': JSON.stringify(process.env.DAB_DB)
    }),
    new webpack.HotModuleReplacementPlugin()
  ])
})