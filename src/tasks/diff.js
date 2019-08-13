import { getFileNameFromPath } from '../utils/fileUtils';

const os = require('os');
const chalk = require('chalk');
const Table = require('cli-table');
const _ = require('underscore');
const { fetchAllFiles, getFileContentSync } = require('./../utils/fileUtils');
const { convertPath, normalizeData } = require('./../utils/stringUtils');
// const logger = require('./logger');

const diff = (fileList1, fileList2, options) => {
  const summary = { TO_CREATE: [], TO_UPDATE: [], TO_DELETE: [] };
  fileList1.forEach(file1 => {
    const file2 = convertPath(file1, options.folderNames[0], options.folderNames[1]);
    if (_.contains(fileList2, file2)) {
      const content1 = getFileContentSync(file1);
      const content2 = getFileContentSync(file2);

      if (content2) {
        // if (Buffer.compare(content1, content2)) {
        if (normalizeData(content1) != normalizeData(content2)) {
          summary.TO_UPDATE.push([file1, file2]);
        }
        fileList2 = _.without(fileList2, file2);
      } else {
        summary.TO_CREATE.push(file1);
      }
    } else {
      summary.TO_CREATE.push(file1);
    }
  });

  // Add files that are left in the second list. This means that they were not present in the initial list
  fileList2.forEach(file2 => {
    summary.TO_DELETE.push(file2);
  });
  return summary;
};

const printSummary = diffResult => {
  var table = new Table({
    head: [chalk.white('State'), chalk.white('Name')],
    colWidths: [10, 60]
  });

  const addToTable = (list, state, style) => {
    _.each(list, file => {
      table.push([style(state), style(getFileNameFromPath(file))]);
    });
  };
  addToTable(diffResult.TO_CREATE, 'New', chalk.green);
  addToTable(diffResult.TO_DELETE, 'Deleted', chalk.red);
  addToTable(_.map(diffResult.TO_UPDATE, file => file[0]), 'Changed', chalk.yellow);

  console.log(table.toString() + os.EOL);

  if (diffResult.TO_CREATE.length > 0) {
    console.log(chalk.bold('New files:     ' + chalk.green(diffResult.TO_CREATE.length)));
  }
  if (diffResult.TO_UPDATE.length > 0) {
    console.log(chalk.bold('Updated files: ' + chalk.green(diffResult.TO_UPDATE.length)));
  }
  if (diffResult.TO_DELETE.length > 0) {
    console.log(chalk.bold('Deleted files: ' + chalk.green(diffResult.TO_DELETE.length)));
  }
  if (diffResult.TO_CREATE.length + diffResult.TO_DELETE.length + diffResult.TO_UPDATE.length == 0) {
    console.log(chalk.bold('No changes found'));
  }

  console.log(os.EOL);
};

/**
 * Determine if 2 dirs are identical
 *
 * @param {*} dir1 path to initial dir
 * @param {*} dir2 path to second dir
 * @param {*} [options={}] diff Options
 * @returns "true" if the 2 dirs are identical. "false" otherwise.
 */
export const arePackagesIdentical = (dir1, dir2, options = {}) => {
  return new Promise((resolve, reject) => {
    Promise.all([fetchAllFiles(dir1), fetchAllFiles(dir2)])
      .then(arrays => {
        try {
          const diffResult = diff(arrays[0], arrays[1], options);
          printSummary(diffResult);
          resolve(diffResult);
        } catch (error) {
          reject(error);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
