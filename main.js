const { app, BrowserWindow, ipcMain } = require('electron');
const co = require('co');

const { getVideoFile } = require('./src/assets/js/offline-viewing/video');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
  });

  win.loadURL(`file://${__dirname}/src/index.html`);

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
ipcMain.on('reqVideos', async (ev, dirPath) => {
  try {
    const files = await getVideoFile(dirPath);
    ev.sender.send('resVideos', files );
  } catch(e) {
    console.log(e.message);
  }

});
