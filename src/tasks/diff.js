const fs = require('fs-extra');

/**
 * Determine if 2 files are identical
 *
 * @param {*} file1 path to initial file
 * @param {*} file2 path to second file
 * @returns "true" if the 2 files are identical. "false" otherwise.
 */
export const areFilesIdentical = (file1, file2) => {
  const data1 = fs.readFileSync(file1);
  const data2 = fs.readFileSync(file2);
  return data1 == data2;
};
