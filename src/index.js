/**
 * Main process file
 *
 * @file index.js
 * @author Sam George
 * @since 1.0.0
 */

// app - Control your application's event lifecycle.
// BrowserWindow - In the main process.
// Or use `remote` from the renderer process.
// const { BrowserWindow } = require('electron').remote
const { app, BrowserWindow } = require('electron'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');
const url = require('url');

// Keep a global reference of the window object,
// if you don't, then the window will be closed automatically when
// the JavaScript object is garbage collected.
let currentWindow = BrowserWindow || null;
// Keep a reference for the development mode
let dev = false;
let loadUrlPath = '';

// Determine the mode (development or production)
if (process.defaultApp
  || /[\\/]electron-prebuilt[\\/]/.test(process.execPath)
  || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
}

/**
 * Create a new browser window
 *
 */
function createBrowserWindow() {
  // create the current window
  currentWindow = new BrowserWindow({
    width: 1380, // Window's width in pixels. Default is 800.
    height: 700, // Window's height in pixels. Default is 600.
    show: false, // Whether window should be shown when created. Default is true
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false
    }
  });
  // Maximizes the window.
  // This will also show (but not focus) the window if it isn't being displayed already.
  currentWindow.maximize();
  // Check whether it is a development or production mode
  // In the development mode, webpack-dev-server will be running
  if(dev && process.argv.indexOf('--noDevServer') === -1) {
    // Set a remote URL 
    loadUrlPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: false
    });
  } else {
    // Set local HTML file in the case of production
    loadUrlPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, '../dist', 'index.html'),
      slashes: true
    });
  }
  // Load a remote URL in the case of development mode
  // or load a local HTML file in the production mode
  currentWindow.loadURL(loadUrlPath);
  // currentWindow.loadFile('./dist/index.html');
  // Don't show the app window until it is ready and loaded.
  // While loading the page, the `ready-to-show` event will be emitted
  // when the renderer process has rendered the page for the first time if the window has not been shown yet.
  // Showing the window after this event will have no visual flash:
  currentWindow.once('ready-to-show', () => {
    currentWindow.show();
    // Open the DevTools automatically if in the development mode
    if (dev) {
      currentWindow.webContents.openDevTools();
    }
  });
  // Emitted when the window is closed.
  // After you have received this event you should remove the reference to the window
  // and avoid using it any more.
  currentWindow.on('closed', () => {
    // Derefernce the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    currentWindow = null;
  });
}

// Emitted once, when Electron has finished initializing.
// and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createBrowserWindow);
// Emitted when all windows have been closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to say active until the user quits explicitly with Cmd + Q
  // Check whether the plaform is not macOS
  if (process.platform !== 'darwin') {
    // Emitted when the application is quitting.
    // On Windows, this event will not be emitted if the app is closed
    // due to a shutdown/restart of the system or a user logout.
    app.quit();
  }
});
// Emitted when the application is activated
app.on('activate', () => {
  // On macOS it is common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open
  if (currentWindow === null) {
    createBrowserWindow();
  }
});
