/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Service } from 'typedi';
import { Logger } from 'lib/core/ports';

enum LogType {
  BASIC,
  ERROR,
  INFO,
  SUCCESS,
}

/**
 * App level logger
 * Use this to log any kind of messages
 */
@Service({ name: 'Logger' })
export class LoggerService implements Logger {
  private static logText(type: LogType): (...args: any[]) => void {
    const styles: { [x in LogType]: string } = {
      [LogType.SUCCESS]: `background: #43A047; color: #fff; padding: 1px 0px;`,
      [LogType.ERROR]: `background: #f44336; color: #fff; padding: 1px 0px;`,
      [LogType.INFO]: `background: #1565C0; color: #fff; padding: 1px 0px;`,
      [LogType.BASIC]: `background: #555555; color: #fff; padding: 1px 0px;`,
    };
    const titles: { [x in LogType]: string } = {
      [LogType.SUCCESS]: 'SUCCESS',
      [LogType.ERROR]: 'ERROR',
      [LogType.INFO]: 'INFO',
      [LogType.BASIC]: 'LOG',
    };

    return console.log.bind(window.console, `%c ${titles[type]} `, styles[type]);
  }

  public log = LoggerService.logText(LogType.BASIC);

  public info = LoggerService.logText(LogType.INFO);

  public success = LoggerService.logText(LogType.SUCCESS);

  public error = LoggerService.logText(LogType.ERROR);
}
