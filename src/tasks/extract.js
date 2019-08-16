const { resolve } = require('path');
const extractZip = require('extract-zip');

/**
 * Extracts the content of a zip file.
 *
 * @param {*} zipPath The absolute path of the zip file
 */
exports.extract = zipPath => {
  return new Promise((res, rej) => {
    return extractZip(resolve(zipPath, 'unpackaged.zip'), { dir: zipPath }, err => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
};
