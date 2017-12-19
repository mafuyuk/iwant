const { ipcRenderer } = require( 'electron' );

const { getVideoElement } = require('./view/video');

const { initVideo } = require('./on-demand/video');

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
return initVideo();
