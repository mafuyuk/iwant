const { app, BrowserWindow, ipcMain } = require('electron');
const co = require('co');

const { getVideoFile } = require('./src/file/video');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
  });

  win.loadURL(`file://${__dirname}/index.html`);

  // win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

// ビデオファイルの通信
ipcMain.on( 'reqVideos', async (ev, dirPath) => {
  const files = await getVideoFile(dirPath);
  ev.sender.send('resVideos', files );
});