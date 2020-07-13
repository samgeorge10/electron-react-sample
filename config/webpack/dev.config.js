/**
 * Webpack development config file
 *
 * @file dev.config.js
 * @author Sam George
 * @since 1.2.0
 */

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { spawn } = require('child_process');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base.config');

const contentBase = path.resolve(__dirname, '../../', 'dist');
const templatePath = './public/index.html';
const DEVELOPMENT = 'development';

process.env.NODE_ENV = DEVELOPMENT;
// Development mode specific configurations
const devConfig = {
  mode: DEVELOPMENT, // string - 'none' | 'development' | 'production'
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase,
    port: 8080,
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    before() {
      spawn(
        'electron',
        ['.'],
        {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        }
      )
        .on('close', (code) => process.exit(0))
        .on('error', (spawnError) => console.error(spawnError));
    }
  },
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
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(DEVELOPMENT)
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
// Merges the base config and the dev config to create a new config object
const config = merge(baseConfig, devConfig);

module.exports = config;
