'use strict'

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const postcssObjectFitImages = require('postcss-object-fit-images')
const precss = require('precss')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const indexPath = path.join(__dirname, '../', 'client', 'src', 'index.html')

module.exports = {
  output: {
    path: path.join(__dirname, '../', 'client', 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['client', 'node_modules'],
    alias: {
      'components': path.resolve(__dirname, '../client/src/components/'),
      'modules': path.resolve(__dirname, '../client/src/modules'),
      'shared': path.resolve(__dirname, '../client/src/shared'),
      'api': path.resolve(__dirname, '../client/src/api')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)|(bower_components)/
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                plugins: (loader) => [
                  autoprefixer()
                ]
              }
            }, 
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  autoprefixer(),
                  precss(),
                  postcssObjectFitImages()
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }),
        include: /(client)|(node_modules)/
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[hash].[ext]',
          },
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
}