/**
 * Webpack config file
 *
 * @file webpack.config.js
 * @author Sam George
 * @since 1.1.0 
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = 'development';
const templatePath = './public/index.html';

const config = {
  mode: DEVELOPMENT, // string - 'none' | 'development' | 'production'
  target: 'electron-main', // Compile for Electron for main process.
  // string - async-node | electron-main | electron-renderer | electron-preload | node | node-webkit | web | webworker
  entry: './src/index.js',
  // By default to ./src
  // Here is the application starts executing and the webpack starts bundling
  plugins: [
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

module.exports = config;
