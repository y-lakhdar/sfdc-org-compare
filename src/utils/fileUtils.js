const { last } = require('underscore');
const fs = require('fs-extra');
const recursive = require('recursive-readdir');

export const fetchAllFiles = rootDir => {
  return new Promise((resolve, reject) => {
    const ignore = ['*-meta.xml', '.DS_Store', 'unpackaged.zip'];
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
  return last(path.split('/'));
};

export const getParentPath = path => {
  const arr = path.split('/');
  arr.pop();
  return arr.join('/');
};

export const deleteDirectory = path => {
  fs.removeSync(path);
};
