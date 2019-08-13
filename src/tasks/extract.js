const path = require('path');
const extractZip = require('extract-zip');

/**
 * Extracts the content of a zip file.
 *
 * @param {*} zipPath The absolute path of the zip file
 */
export const extract = zipPath => {
  return new Promise((resolve, reject) => {
    // Logger.info(`Extracting ${zipPath}`);
    return extractZip(path.resolve(zipPath, 'unpackaged.zip'), { dir: zipPath }, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
