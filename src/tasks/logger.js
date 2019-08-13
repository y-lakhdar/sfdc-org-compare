import { EOL } from 'os';
import { each } from 'underscore';
const chalk = require('chalk');

export class Logger {
  static log(message, options, ...meta) {
    let fullMessage = '';
    each(meta, m => {
      if (m.toString()) {
        fullMessage += EOL + m.toString();
      }
      options.style = options.style || (x => x);
      console.log(options.style(message + fullMessage));
    });
  }

  static info(message, ...meta) {
    // if (this.level <= LoggerSingleton.ERROR) {
    Logger.log(message, { style: chalk.yellow }, meta);
    // }
  }

  static error(message, ...meta) {
    // if (this.level <= LoggerSingleton.ERROR) {
    Logger.log(message, { style: chalk.red }, meta);
    // }
  }
}
