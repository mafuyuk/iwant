const { ipcRenderer } = require( 'electron' );

const { getVideoElement } = require('../view/video');

const fileDir = localStorage.getItem('DIR_PATH');

// ビデオの表示
ipcRenderer.send('reqVideos', fileDir);
ipcRenderer.on('resVideos', (event, files) => {
  for (const file of files) {
    const ve = getVideoElement(`${fileDir}/${file}`, 'poster.png');
    document.getElementById("video").innerHTML += ve;
  }
});

// ストリーミング
const bucket = 'media-convert-iwant';
const path = 'encode/test.mpd';

ipcRenderer.send('reqMPD', bucket, path);
ipcRenderer.on('resMPD', (event, mpdXML) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(mpdXML, "text/xml");
  console.log(dom);
});