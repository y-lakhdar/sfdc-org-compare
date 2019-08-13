const _ = require('underscore');
const fs = require('fs-extra');
const recursive = require('recursive-readdir');

export const fetchAllFiles = rootDir => {
  return new Promise((resolve, reject) => {
    const ignore = ['*-meta.xml', '.DS_Store'];
    recursive(rootDir, ignore)
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        // TODO: add logger
        reject(`Unable to read package directory "${rootDir}"`);
      });
  });
};

export const getFileContentSync = filePath => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
  }
  return null;
};

export const getFileNameFromPath = path => {
  return _.last(path.split('/'));
};

export const deleteDirectory = path => {
  fs.removeSync(path);
};
