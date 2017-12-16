const { app, BrowserWindow, ipcMain } = require('electron');
const co = require('co');

const { getVideoFile } = require('./src/file/video');
const S3Client = require('./src/infrastructure/s3');

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

// MPDファイルの取得
ipcMain.on('reqMPD', async (ev, bucket, path) => {
  const s3Client = new S3Client();
  try {
    const data = await s3Client.get(bucket, path);
    ev.sender.send('resMPD', data.Body.toString('utf-8'));
  } catch (e) {
    console.log(JSON.stringify(e));
  }
});
