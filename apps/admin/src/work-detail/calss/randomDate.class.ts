import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class RandomDate {
  async getRandom(min: number, max: number): Promise<string> {
    return new Promise((resolve) => {
      const random = Math.floor(Math.random() * (max - min + 1) + min);
      let value = random.toFixed(0);
      value = value.length === 1 ? (value = '0' + value) : value;
      resolve(value);
    });
  }

  async getTime(consult?: string): Promise<string> {
    if (!consult) consult = moment().format('YYYY-MM-DD HH:mm:ss');
    const hour = await this.getRandom(0, 23);
    const minute = await this.getRandom(0, 59);
    const second = await this.getRandom(0, 59);
    let target = `${hour}:${minute}:${second}`;
    return new Promise(async (resolve) => {
      const index = await this.getRandom(0, 2);
      let number: number;
      switch (index) {
        case '00':
          number = +(await this.getRandom(0, 10));
          target = moment(consult).add(number, 'hour').format('HH:mm:ss');
          break;
        case '01':
          number = +(await this.getRandom(0, 59));
          target = moment(consult).add(number, 'minute').format('HH:mm:ss');
          break;
        case '02':
          number = +(await this.getRandom(0, 59));
          target = moment(consult).add(number, 'second').format('HH:mm:ss');
          break;
        default:
          break;
      }
      resolve(target);
    });
  }

  async updateDateToToday() {
    const number = +(await this.getRandom(0, 5));
    const date = moment().subtract(number, 'day').format('YYYY-MM-DD');
    const DJTime = `${date} ${await this.getTime()}`;
    const StudyDateTime = `${date} ${await this.getTime(DJTime)}`;
    const ReportDateTime = `${date} ${await this.getTime(StudyDateTime)}`;
    const ApproveDateTime = `${date} ${await this.getTime(ReportDateTime)}`;
    return {
      DJTime,
      StudyDateTime,
      ReportDateTime,
      ApproveDateTime,
    };
  }
}
