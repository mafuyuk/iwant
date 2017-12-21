const { ipcRenderer } = require( 'electron' );

const { getVideoElement } = require('./view/video');

const { initVideo } = require('./streaming-player/video');

const fileDir = localStorage.getItem('DIR_PATH');

// ビデオの表示
ipcRenderer.send('reqVideos', fileDir);
ipcRenderer.on('resVideos', (event, files) => {
  for (const file of files) {
    try {
      const ve = getVideoElement(`${fileDir}/${file}`, 'poster.png');
      document.getElementById("video").innerHTML += ve;
    } catch (e) {
      console.log(e.message);
    }
  }
});

// ストリーミング
return initVideo();
