const fs = require('fs');
const { promisify } = require('util');

/**
 * isVideo is return true for video extension
 *
 * @param file string
 * @return boolean
 */
function isVideo(file) {
  return /.*\.mp4/.test(file) || /.*\.webm/.test(file);
}

/**
 * getVideoFile is return the video file of the format you specified
 *
 * @param dirPath string
 * @return Promise
 */
function getVideoFile(dirPath) {
  return promisify(fs.readdir)(dirPath).then(files => files.filter(isVideo)).catch((e) => {
    throw new Error(`Fail getVideoFile. ${e}`);
  });
}

module.exports = {
  getVideoFile,
};
