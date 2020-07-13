/**
 * Webpack base config file
 *
 * @file base.config.js
 * @author Sam George
 * @since 1.2.0
 */

const path = require('path');

const library = 'Electron_React_Sample';
const outputPath = path.resolve(__dirname, '../../', 'dist');
const sourcePath = path.resolve(__dirname, '../../', 'src');

const config = {
  target: 'electron-renderer',
  // string - async-node | electron-main | electron-renderer | electron-preload | node | node-webkit | web | webworker
  // Compile for Electron for renderer process, providing a target using JsonpTemplatePlugin,
  // FunctionModulePlugin for browser environments and NodeTargetPlugin
  // and ExternalsPlugin for CommonJS and Electron built-in modules.
  // entry: './src/renderer.js',
  entry: {
    index: './src/renderer.js'
  },
  // By default to ./src
  // Here is the application starts executing and the webpack starts bundling
  output: {
    path: outputPath,
    filename: '[name].js',
    library,
    libraryTarget: 'umd'
    // publicPath: ''
  },
  resolve: {
    modules: [
      'node_modules',
      sourcePath
    ],
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ],
    enforceExtension: false
  }
};

module.exports = config;
