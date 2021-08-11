/* eslint-disable prefer-rest-params */
import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';
export function writeLog(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<PropertyDecorator>,
) {
  const _origin = descriptor.value;
  descriptor.value = function () {
    _origin.call(this, ...arguments);
    // 将日志内容写入文件
    const baseDir = path.join(
      __dirname,
      `logger/${moment().format('YYYY-MM-DD')}`,
    );
    const existsDir = fs.existsSync(baseDir);
    if (!fs.existsSync(path.join(__dirname, 'logger'))) {
      fs.mkdirSync(path.join(__dirname, 'logger'));
    }
    if (!existsDir) {
      fs.mkdirSync(baseDir);
    }
    const fileName = `${moment().format('YYYY-MM-DD-HH-00-00')}.txt`;
    const filePath = path.join(baseDir, fileName);
    arguments.length &&
      fs.appendFileSync(filePath, logTemplete(arguments), {
        encoding: 'utf-8',
      });
  };
}

function logTemplete(args: IArguments): string {
  const now = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]\t`;
  let templete = now;
  for (let i = 0; i < args.length; i++) {
    let value = args[i] as string;
    if (i === args.length - 1) {
      value = `[${value}]`;
    }
    templete += value;
    templete += '\t';
  }
  templete += '\n';
  return templete;
}
