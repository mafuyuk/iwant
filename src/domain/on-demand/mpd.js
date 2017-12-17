const { checkStatus, parseXML } = require('../../infrastructure/http');

function getMPD(url) {
  return fetch(url)
    .then(checkStatus)
    .then(parseXML)
    .catch((error) => {
      console.log('request failed', error)
    });
}

module.exports = {
  getMPD,
};