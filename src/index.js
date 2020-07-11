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
const { app, BrowserWindow } = require('electron');

// Keep a global reference of the window object,
// if you don't, then the window will be closed automatically when
// the JavaScript object is garbage collected.
let currentWindow = BrowserWindow || null;
// Keep a reference for the development mode
let dev = false;

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
  });
  // Maximizes the window.
  // This will also show (but not focus) the window if it isn't being displayed already.
  currentWindow.maximize();
  // load the local index file of the application
  currentWindow.loadFile('./public/index.html');
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
