import { resolve } from 'path';
const extractZip = require('extract-zip');

/**
 * Extracts the content of a zip file.
 *
 * @param {*} zipPath The absolute path of the zip file
 */
export const extract = zipPath => {
  return new Promise((res, rej) => {
    // Logger.info(`Extracting ${zipPath}`);
    return extractZip(resolve(zipPath, 'unpackaged.zip'), { dir: zipPath }, err => {
      if (err) {
        rej(err);
      }
      res();
    });
  });
};
