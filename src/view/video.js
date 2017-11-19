/**
 * getVideoElement is return video element
 *
 * @param filePath string
 * @param poster string
 * @return string
 */
function getVideoElement(filePath, poster) {
  // TODO use poster
  return '' +
    `<video class='right' width='320' height='240' controls >` +
    `<source src='${filePath}' type='video/mp4'>` +
    'Your browser does not support the video tag.' +
    '</video>';
}

module.exports = {
  getVideoElement,
};