// import { spawn } from 'child_process';

/**
 * Retrieve metadata from an org using Metadata API
 *
 * @param {*} retrievetargetdir Directory root for the retrieved files
 * @param {*} xmlPackage Path to XML Package
 * @param {*} targetusername Username or alias for the target org; Ovverides default target org.
 */
export const retrieveMetadata = () => {
  return new Promise(resolve => {
    resolve();
  });
};
// export const retrieveMetadata = (retrievetargetdir, xmlPackage, targetusername) => {
//   return new Promise((resolve, reject) => {
//     return spawn('sfdx', ['force:mdapi:retrieve', '-r', retrievetargetdir, '-u', targetusername, '-k', xmlPackage], {
//       stdio: 'inherit'
//     }).on('exit', function(error) {
//       if (error) {
//         reject(error);
//       }
//       resolve();
//     });
//   });
// };
