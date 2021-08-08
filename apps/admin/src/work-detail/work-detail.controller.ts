import { tReportInfoKiosk } from '@libs/pacsdb/model/tReportInfoKiosk.model';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { WorkDetailService } from './work-detail.service';
import * as moment from 'momnet';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { dateFormatDto, findWorklistDto } from './dto/index.dto';
import { v_worklist_viewer } from 'libs/worklistdb/model/v_worklist_viewer.model';

const utils = {
  dateFormat(date: string): dateFormatDto {
    const targetDate = date.match(/^[0-9\-]+$/g) ? date : moment();
    return {
      startDate: moment(targetDate).format('YYYY-MM-DD 00:00:00'),
      endDate: moment(targetDate).format('YYYY-MM-DD 23:59:59'),
    };
  },
};

class findAllDto {
  @ApiProperty({ description: '需要查询的日期', default: '20210414' })
  date?: string;
  @ApiProperty({ description: '指定设备类型', default: 'CT' })
  modalityType?: string;
  @ApiProperty({ description: '是否需要选择设备', default: 'CT_06TOSHIBA' })
  modality?: string;
  @ApiProperty({ description: '指定时间类型', default: 'StudyDateTime' })
  dateKey: string;
  @ApiProperty({ description: '患者类型', default: '门诊' })
  patientType: string;
}

@ApiTags('影像科工作队列API')
@Controller('work-detail')
export class WorkDetailController {
  constructor(private readonly service: WorkDetailService) {}

  @Get()
  @ApiOperation({ summary: '测试' })
  async updateTest() {
    await this.service.updateDB();
  }

  // 通过传入组合参数来获取工作明细
  @Post()
  @ApiOperation({ summary: '通过传入组合参数来获取工作明细' })
  async getWorklist(
    @Body() body: findWorklistDto,
  ): Promise<v_worklist_viewer[]> {
    const result = await this.service.getWorkStatus({
      where: {
        date:
          moment(body.date).format('YYYY-MM-DD') ||
          moment().format('YYYY-MM-DD'),
        modality: body.modality || Not(''),
        modalityType: body.modalityType || Not(''),
        patientType: body.patientType || Not(''),
      },
    });
    return result;
  }
}
