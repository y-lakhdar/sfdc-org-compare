const { last } = require('underscore');
const fs = require('fs-extra');
const recursive = require('recursive-readdir');

exports.fetchAllFiles = rootDir => {
  return new Promise((resolve, reject) => {
    const ignore = ['*-meta.xml', '.DS_Store', 'unpackaged.zip'];
    recursive(rootDir, ignore)
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        reject(`Unable to read package directory "${rootDir}"`);
      });
  });
};

exports.getFileContentSync = filePath => {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
  }
  return null;
};

exports.getFileNameFromPath = path => {
  return last(path.split('/'));
};

exports.getParentPath = path => {
  const arr = path.split('/');
  arr.pop();
  return arr.join('/');
};

exports.deleteDirectory = path => {
  fs.removeSync(path);
};
