const os = require('os');
const chalk = require('chalk');
const _ = require('underscore');

export class Logger {
  log(message, options, ...meta) {
    let fullMessage = '';
    _.each(meta, m => {
      if (m.toString()) {
        fullMessage += os.EOL + m.toString();
      }
      options.style = options.style || (x => x);
      console.log(options.style(message + fullMessage));
    });
  }

  static info(message, ...meta) {
    // if (this.level <= LoggerSingleton.ERROR) {
    this.log(message, { style: chalk.yellow }, meta);
    // }
  }

  static error(message, ...meta) {
    // if (this.level <= LoggerSingleton.ERROR) {
    this.log(message, { style: chalk.red }, meta);
    // }
  }
}
