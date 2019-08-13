const path = require('path');
const program = require('commander');
import { retrieveMetadata } from './tasks/retrieve';
// import { extract } from './tasks/extract';
import { arePackagesIdentical } from './tasks/diff';
import { interactive } from './tasks/interactive';
import { deleteDirectory } from './utils/fileUtils';
import { Logger } from './tasks/logger';

// Setup notification updates in case of a new version
const pkg = require('./../package.json');
const updateNotifier = require('update-notifier');
updateNotifier({ pkg }).notify();

program.version(pkg.version);

program
  .command('compare <username1> <username2> <retrievetargetdir> <xmlPackage>')
  .description('Compare metadata between 2 Orgs based on the XML package')
  .option('-d --delete', 'Delete file artifacts after the diff')
  .option('-p --buildpackage', 'Build XML package based on thr diff')
  .action((username1, username2, retrievetargetdir, xmlPackage, options) => {
    const folderNames = ['mdapipkg-1', 'mdapipkg-2'];
    const pathToPackages = [path.resolve(retrievetargetdir, folderNames[0]), path.resolve(retrievetargetdir, folderNames[1])];

    Promise.all([retrieveMetadata(pathToPackages[0], xmlPackage, username1), retrieveMetadata(pathToPackages[1], xmlPackage, username2)])
      // TODO: add loading animation here
      .then(() => {
        // extract();
        arePackagesIdentical(pathToPackages[0], pathToPackages[1], { folderNames, pathToPackages })
          .then(diffResult => {
            if (diffResult.TO_UPDATE) {
              interactive(diffResult);
            }
            if (options.delete) {
              Logger.info(`Deleting directory ${retrievetargetdir}`);
              deleteDirectory(retrievetargetdir);
            }
            if (options.buildpackage) {
              // TODO: build XML Package
            }
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

program.parse(process.argv);
