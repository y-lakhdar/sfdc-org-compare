const path = require('path');
const extractZip = require('extract-zip');

/**
 * Extracts the content of a zip file.
 *
 * @param {*} zipPath The absolute path of the zip file
 */
export const extract = zipPath => {
  return new Promise((resolve, reject) => {
    // TODO: put in a variable "sfdc-org-diff"
    return extractZip(zipPath, { dir: path.resolve(__dirname, 'sfdc-org-diff') }, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
