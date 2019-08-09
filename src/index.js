const program = require('commander');
// import { areFilesIdentical } from './tasks/diff';
import { retrieveMetadata } from './tasks/retrieve';

program
  .command('compare <username1> <username2> <retrievetargetdir> <xmlPackage>')
  .description('Compare metadata between 2 Orgs based on the XML package')
  .action((username1, username2, retrievetargetdir, xmlPackage) => {
    Promise.all([retrieveMetadata(retrievetargetdir, xmlPackage, username1), retrieveMetadata(retrievetargetdir, xmlPackage, username2)])
      // TODO: add loading animation here
      .then(() => {
        // TODO: Read files from directory
        // TODO: Extract files
        // TODO: Compare files
        // TODO: Print summary
      })
      .catch(err => {
        console.log(err);
      });
  });

program.parse(process.argv);
