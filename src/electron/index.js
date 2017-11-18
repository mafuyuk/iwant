// const { app, BrowserWindow } = require('electron');
const co = require('co');
const fv = require('../file/video');

// Electron
let mainWindow;

// Constats
const indexHTML = `file://${__dirname}/index.html`;

app.on('window-all-closed', () => {
  console.log(process.platform);
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(indexHTML);
  console.log(getVideoFile('.', ''));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
