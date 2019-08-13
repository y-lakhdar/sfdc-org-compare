const path = require('path');
const program = require('commander');
import { retrieveMetadata } from './tasks/retrieve';
// import { extract } from './tasks/extract';
import { arePackagesIdentical } from './tasks/diff';
import { interactive } from './tasks/interactive';
program
  .command('compare <username1> <username2> <retrievetargetdir> <xmlPackage>')
  .description('Compare metadata between 2 Orgs based on the XML package')
  .option('-d --delete', 'Delete file artifacts after the diff')
  .option('-p --buildpackage', 'Build XML package based on thr diff')
  .action((username1, username2, retrievetargetdir, xmlPackage) => {
    const folderNames = ['mdapipkg-1', 'mdapipkg-2'];
    const pathToPackages = [path.resolve(retrievetargetdir, folderNames[0]), path.resolve(retrievetargetdir, folderNames[1])];

    Promise.all([retrieveMetadata(pathToPackages[0], xmlPackage, username1), retrieveMetadata(pathToPackages[1], xmlPackage, username2)])
      // TODO: add loading animation here
      .then(() => {
        // Extracting files
        // extract();
        // TODO: Read files from directory
        arePackagesIdentical(pathToPackages[0], pathToPackages[1], { folderNames, pathToPackages })
          .then(diffResult => {
            // TODO: Ask which field to diff
            if (diffResult.TO_UPDATE) {
              interactive(diffResult);
            }
            // TODO: Delete files after if specified
          })
          .catch(err => {
            console.error(err);
          });
        // TODO: Group Aura components
      })
      .catch(err => {
        console.log(err);
      });
  });

program.parse(process.argv);
