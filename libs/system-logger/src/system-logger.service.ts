/* eslint-disable prefer-rest-params */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { writeLog } from './writeLog.decorator';

@Injectable()
export class SystemLoggerService extends ConsoleLogger {
  @writeLog
  log(message: any, ...optionalParams: [...any, string?]) {
    super.log.apply(this, arguments);
  }
  @writeLog
  error(message: any, ...optionalParams: [...any, string?]) {
    super.log.apply(this, arguments);
  }
  @writeLog
  warn(message: any, ...optionalParams: [...any, string?]) {
    super.log.apply(this, arguments);
  }
  @writeLog
  debug(message: any, ...optionalParams: [...any, string?]) {
    super.log.apply(this, arguments);
  }
}
