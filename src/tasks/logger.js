const os = require('os');
const chalk = require('chalk');
const _ = require('underscore');

const log = (message, options, ...meta) => {
  let fullMessage = '';
  _.each(meta, m => {
    if (m.toString()) {
      fullMessage += os.EOL + m.toString();
    }
    options.style = options.style || (x => x);
    console.log(options.style(message + fullMessage));
  });
};

export const error = (message, ...meta) => {
  // if (this.level <= LoggerSingleton.ERROR) {
  log(message, { style: chalk.red }, meta);
  // }
};
