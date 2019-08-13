const os = require('os');

export const convertPath = (text, initial, replacer) => {
  return text.replace(initial, replacer);
};

export const normalizeData = data => {
  return data.replace(/\r\n/gm, os.EOL).replace(/\n/gm, os.EOL);
};
