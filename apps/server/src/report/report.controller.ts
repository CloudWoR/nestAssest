import { Holiday } from '@libs/local-db/holiday/holidy.model';
import { SignImage } from '@libs/local-db/holiday/signImage.model';
import { tReportInfoKiosk } from '@libs/pacsdb/model/tReportInfoKiosk.model';
import { Controller, Get, Injectable, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { getModelForClass } from '@typegoose/typegoose';
import * as moment from 'momnet';
import { InjectModel } from 'nestjs-typegoose';
import { Repository, Not, Between } from 'typeorm';

interface getReportDto {
  holiday: boolean;
  report: any;
}

@Controller('report')
@ApiTags('为自助提供的接口')
@Injectable()
export class ReportController {
  constructor(
    @InjectRepository(tReportInfoKiosk)
    private pacs: Repository<tReportInfoKiosk>,
    @InjectModel(SignImage) private readonly model,
  ) {}
  async reportType(date: string): Promise<boolean> {
    const targetDate = moment(date).format('YYYY-MM-DD');
    // 判断报告类型必须以当天为准
    const currentDay = moment(targetDate).weekday();
    const currentDate = moment().format('YYYY-MM-DD');
    const holidayAffirm = {
      isHoliday: false,
      isWeekend: false,
      isNightShift: !moment().isBetween(
        `${currentDate} 07:50:00`,
        `${currentDate} 17:30:00`,
      ),
    };
    if (currentDay === 6 || currentDay === 7) holidayAffirm.isWeekend = true;
    // 夜班期间，任何时候都可以打印临时报告
    if (holidayAffirm.isNightShift) return true;
    const HolidayModel = getModelForClass(Holiday);
    const result = await HolidayModel.findOne({ date: currentDate });
    // 有明确记录当天为节假日
    if (result && result.holiday) return true;
    // 剩下非夜班，非节假日，可能有周末
    // 禁止打印临时模板
    // 首先排除周末
    if (holidayAffirm.isWeekend) return true;
    return false;
  }

  @Get(':date')
  @ApiOperation({ summary: '获取指定日期全天内容' })
  async getReport(@Param('date') date: string): Promise<getReportDto> {
    const holiday = await this.reportType(date);
    const targetDate = moment(date).format('YYYY-MM-DD');
    const report = await this.pacs.find({
      select: [
        'ModalityType', // 设备类型
        'Modality', // 设备
        'RISPID', // 影像号
        'AccessionNumber', // 检查号
        'ReportDateTime', // 报告日期
        'PatientCName', // 姓名
        'Sex', // 性别
        'Age', // 年龄
        'ClinicNo', // 门诊号
        'ApplyDept', // 申请科室
        'CH', // 床号
        'InhospitalNo', // 住院号
        'BQ', // 病区
        'StudyDateTime', // 检查日期
        'Description', // 检查项目
        'JCFS', // 检查方式
        'Representation', // 诊断描述
        'Impression', // 诊断结论
        'ReportDoctor', // 诊断医师
        'ReportApprover', // 报告医师
      ],
      where: {
        ReportDateTime: Between(
          `${targetDate} 00:00:00`,
          `${targetDate} 23:59:59`,
        ),
      },
    });
    return {
      holiday,
      report,
    };
  }

  @Get('/one/patient')
  async targetGet(
    @Query('AccessionNubmer') AccessionNumber: string,
  ): Promise<getReportDto> {
    if (!AccessionNumber) {
      return {
        holiday: false,
        report: null,
      };
    }
    const currentDay = moment().format('YYYY-MM-DD');
    const holiday = await this.reportType(currentDay);
    const report = await this.pacs.findOne({
      select: [
        'ModalityType', // 设备类型
        'Modality', // 设备
        'RISPID', // 影像号
        'AccessionNumber', // 检查号
        'ReportDateTime', // 报告日期
        'PatientCName', // 姓名
        'Sex', // 性别
        'Age', // 年龄
        'ClinicNo', // 门诊号
        'ApplyDept', // 申请科室
        'CH', // 床号
        'InhospitalNo', // 住院号
        'BQ', // 病区
        'StudyDateTime', // 检查日期
        'Description', // 检查项目
        'JCFS', // 检查方式
        'Representation', // 诊断描述
        'Impression', // 诊断结论
        'ReportDoctor', // 诊断医师
        'ReportApprover', // 报告医师
      ],
      where: { AccessionNumber },
    });
    return {
      holiday,
      report,
    };
  }

  @Get('sign/api')
  @ApiOperation({ summary: '舒适化医师签名' })
  sign() {
    const doctorList = [
      '张配赟',
      '纪晓雨',
      '龙治刚',
      '施湖涛',
      '宋光义',
      '田磊',
      '王利',
      '王娆',
      '杨丛珊',
      '刘雅洁',
      '袁新鹏',
    ];
    const SignImageModel = getModelForClass(SignImage);
    doctorList.forEach(async (doctor) => {
      let group = '诊断组';
      let signImage = '';
      let auditRight = false;
      const result = await this.pacs.findOne({
        select: ['ReportDoctorImage'],
        where: {
          ReportDateTime: Not(''),
          ReportDoctor: doctor,
        },
      });
      if (doctor === '龙治刚' || doctor === '宋光义' || doctor === '施湖涛') {
        group = '审核组';
        auditRight = true;
      }
      if (doctor === '纪晓雨' || doctor === '王娆' || doctor === '杨丛珊')
        auditRight = true;
      signImage = result.ReportDoctorImage;
      const buffer = new Buffer(signImage, 'base64');
      const hasData = await SignImageModel.findOne({ doctorName: doctor });
      !hasData &&
        SignImageModel.create({
          jobNumber: '',
          doctorName: doctor,
          auditRight,
          group,
          signImage: buffer.toString('base64'),
        });
    });
    return 'success';
  }
}
