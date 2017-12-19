const { checkStatus } = require('../http');
const { getMPD } = require('./mpd');

let mediaSource;

let mimeCodec;

const host = 'https://s3.amazonaws.com/';
const bucket = 'media-convert-iwant';
const path = 'encode/test.mpd';

async function initVideo() {
  const mpd = await getMPD(`${host}${bucket}/${path}`);

  const segmentTemplate = mpd.getElementsByTagName('SegmentTemplate')[0];
  const initialization = segmentTemplate.getAttribute('initialization');
  const media = segmentTemplate.getAttribute('media');

  const adaptationSet = mpd.getElementsByTagName('AdaptationSet')[0];
  const mimeType = adaptationSet.getAttribute('mimeType');
  const codecs = adaptationSet.getAttribute('codecs');
  mimeCodec = `${mimeType}; codecs="${codecs}"`;


  const video = document.getElementsByTagName('video')[0];
  if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
    mediaSource = new MediaSource;
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
    console.error('Unsupported MIME type or codec: ', mimeCodec);
  }

}

function sourceOpen(_) {
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  console.log(mimeCodec);
  console.log(mediaSource);
  console.log(sourceBuffer);
  getVideo(`${host}${bucket}/encode/test_000000001.mp4`).then((res) => {
    sourceBuffer.addEventListener('updateend', () => {
      mediaSource.endOfStream();
      video.play();
    });
    sourceBuffer.appendBuffer(res.body);
  });
}

function getVideo(url) {
  return fetch(url)
    .then(checkStatus)
    .catch((error) => {
      console.log('request failed', error)
    });
}

module.exports = {
  initVideo,
};