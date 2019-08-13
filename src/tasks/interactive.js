import { getFileNameFromPath } from '../utils/fileUtils';
import { spawn } from 'child_process';

const _ = require('underscore');
const inquirer = require('inquirer');

const openVsCodeDiff = filesToDiff => {
  _.each(filesToDiff, group => {
    spawn('code', ['--diff', group[0], group[1], '--new-window']).on('exit', function(error) {
      if (error) {
        console.error(error);
      }
    });
  });
};

export const interactive = diffResult => {
  const fileDict = {};

  _.each(diffResult.TO_UPDATE, group => {
    fileDict[getFileNameFromPath(group[0])] = group;
  });

  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select the files to diff',

        name: 'filesToDiff',
        choices: _.keys(fileDict)
      }
    ])
    .then(answers => {
      const filesToDiff = [];
      _.each(answers.filesToDiff, file => {
        filesToDiff.push(fileDict[file]);
      });
      openVsCodeDiff(filesToDiff);
    });
};
