const { checkStatus } = require('../../infrastructure/http');

function getMPD(url) {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.text())
    .then(parseXML)
    .catch((error) => {
      console.log('request failed', error)
    });
}

function parseXML(stringContainingXMLSource) {
  const parser = new DOMParser();
  return parser.parseFromString(stringContainingXMLSource, "text/xml");
}

module.exports = {
  getMPD,
};