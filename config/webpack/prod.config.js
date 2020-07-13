/**
 * Webpack production config file
 *
 * @file prod.config.js
 * @author Sam George
 * @since 1.2.0
 */

/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base.config');

const templatePath = './public/index.html';
const PRODUCTION = 'production';

process.env.NODE_ENV = PRODUCTION;
// Production mode specific configurations
const prodConfig = {
  mode: PRODUCTION, // string - 'none' | 'development' | 'production'
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'babel-preset-react-app'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(PRODUCTION)
    }),
    // Cleaning up the '/dist' folder
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // The file to write the HTML to.
      // Defaults to index.html. You can specify a subdirectory here too (eg: assets/admin.html)
      inject: false,
      // true || 'head' || 'body' || false
      // Inject all assets into the given template or templateContent.
      // When passing true or 'body' all javascript resources will be placed at the bottom of the body element.
      // 'head' will place the scripts in the head element - see the inject:false example
      template: templatePath
      // webpack relative or absolute path to the template.
      // By default it will use src/index.ejs if it exists.
    })
  ]
};
// Merges the base config and the prod config to create a new config object
const config = merge(baseConfig, prodConfig);

module.exports = config;
