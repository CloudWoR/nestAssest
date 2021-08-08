import { Holiday } from '@libs/local-db/holiday/holidy.model';
import {
  Controller,
  Get,
  HttpService,
  Injectable,
  Param,
} from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { InjectModel } from 'nestjs-typegoose';
import { getModelForClass } from '@typegoose/typegoose';
import * as moment from 'momnet';

interface getReportDto {
  interimReport: boolean;
  report: object;
}

@Crud({
  model: Holiday,
})
@ApiTags('获取日期')
@Controller('calendar')
@Injectable()
export class CalendarController {
  constructor(
    @InjectModel(Holiday) private readonly model,
    private httpService: HttpService,
  ) {}

  @Get('/api')
  async holiday(): Promise<Observable<AxiosResponse<any>>> {
    try {
      const res = await this.httpService
        .get('http://timor.tech/api/holiday/year/2021')
        .toPromise();
      const data = res.data;
      if (data.code !== 0) throw new Error('获取节假日失败!');
      const HolidayModel = getModelForClass(Holiday);
      const holiday = [];
      Object.keys(data.holiday).forEach((keyDay) => {
        const detail = data.holiday[keyDay];
        const holidayDetail = {
          year: detail.date.slice(0, 4),
          keyDay,
          holiday: detail.holiday,
          holidayName: detail.name,
          wage: detail.wage,
          date: detail.date,
        };
        holiday.push(holidayDetail);
      });
      holiday.forEach(async (item) => {
        const result = await HolidayModel.findOne({ date: item.date });
        !result && (await HolidayModel.create(item));
      });
      return data;
    } catch (err) {
      return;
    }
  }

  @Get('/api/getReport:date')
  @ApiOperation({ summary: '获取指定日期全天内容' })
  async getReport(@Param('date') date: string): Promise<getReportDto> {
    const interimReport = false; // 是否为临时报告
    // 获取目标日期
    const targetDate = moment(date).format('YYYY-MM-DD');
    // 判断报告类型必须以当天为准
    const currentDay = moment(targetDate).weekday();
    const currentDate = moment().format('YYYY-MM-DD');
    const holidayAffirm = {
      isHoliday: false,
      isWeekend: false,
      isNightShift: !moment().isBetween(
        '2021-04-08 07:50:00',
        '2021-04-08 17:30:00',
      ),
    };
    if (currentDay === 6 || currentDay === 7) holidayAffirm.isWeekend = true;
    // 夜班期间，任何时候都可打印临时报告
    if (holidayAffirm.isNightShift) {
      return {
        interimReport: true,
        report: {},
      };
    }
    const HolidayModel = getModelForClass(Holiday);
    const result = await HolidayModel.findOne({ date: currentDate });
    // 有明确记录当天为节假日
    if (result && result.holiday) {
      return {
        interimReport: true,
        report: {},
      };
    }
    // 剩下非夜班，非节假日，可能有周末
    // 禁止打印临时模板
    // 首先排除周末
    if (holidayAffirm.isWeekend) {
      return {
        interimReport: true,
        report: {},
      };
    }
    console.log('正常上班期间');
    return {
      interimReport: false,
      report: {},
    };
  }
}
