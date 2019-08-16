const os = require('os');

exports.convertPath = (text, initial, replacer) => {
  return text.replace(initial, replacer);
};

exports.normalizeData = data => {
  return data.replace(/\r\n/gm, os.EOL).replace(/\n/gm, os.EOL);
};
