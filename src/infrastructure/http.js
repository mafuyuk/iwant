function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    const error = new Error(res.statusText);
    error.response = res;
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function parseXML(response) {
  return response.text().then((stringContainingXMLSource) => {
    const parser = new DOMParser();
    return parser.parseFromString(stringContainingXMLSource, "text/xml");
  });
}

module.exports = {
  checkStatus,
  parseJSON,
  parseXML,
};