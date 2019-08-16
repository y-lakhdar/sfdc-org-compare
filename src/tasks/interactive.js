const { getFileNameFromPath } = require('../utils/fileUtils');
const { spawn } = require('child_process');
const { each, keys } = require('underscore');
const { prompt } = require('inquirer');

const openVsCodeDiff = filesToDiff => {
  each(filesToDiff, group => {
    spawn('code', ['--diff', group[0], group[1], '--new-window']).on('exit', function(error) {
      if (error) {
        console.error(error);
      }
    });
  });
};

exports.interactive = diffResult => {
  const fileDict = {};

  each(diffResult.TO_UPDATE, group => {
    fileDict[getFileNameFromPath(group[0])] = group;
  });

  prompt([
    {
      type: 'checkbox',
      message: 'Select the files to diff',

      name: 'filesToDiff',
      choices: keys(fileDict)
    }
  ]).then(answers => {
    const filesToDiff = [];
    each(answers.filesToDiff, file => {
      filesToDiff.push(fileDict[file]);
    });
    openVsCodeDiff(filesToDiff);
  });
};
