import { tReportInfoKiosk } from '@libs/pacsdb/model/tReportInfoKiosk.model';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { v_worklist_viewer } from 'libs/worklistdb/model/v_worklist_viewer.model';
import { worklist } from 'libs/worklistdb/model/worklist.model';
import * as moment from 'momnet';
import { Repository, FindConditions, Between, In, Not } from 'typeorm';
import { RandomDate } from './calss/randomDate.class';
import { dateFormatDto, findWorklistDto } from './dto/index.dto';

interface baseFindDTO {
  date?: string;
  limit?: number;
  primaryKey?: 'modality' | 'sourceOfPatient';
  secondaryKey?: 'modality' | 'sourceOfPatient';
  where?: FindConditions<tReportInfoKiosk>;
}

@Injectable()
export class WorkDetailService {
  constructor(
    private scheduleRegistry: SchedulerRegistry,
    @InjectRepository(worklist, 'workdb')
    private readonly workdb: Repository<worklist>,
    @InjectRepository(v_worklist_viewer, 'workdb')
    private readonly v_worklist: Repository<v_worklist_viewer>,
    private readonly randomDate: RandomDate,
  ) {}

  // 基本获取函数，传入日期、分类关键字后，去获取pacs
  async baseFind(): Promise<worklist[]> {
    const result = await this.workdb.find({
      select: ['id', 'DJTime'],
    });
    return result;
  }

  // 刷新数据库
  async updateDB() {
    const result = await this.baseFind();
    for (const column of result) {
      const {
        DJTime,
        StudyDateTime,
        ReportDateTime,
        ApproveDateTime,
      } = await this.randomDate.updateDateToToday();
      await this.workdb
        .createQueryBuilder()
        .update()
        .set({ DJTime, StudyDateTime, ReportDateTime, ApproveDateTime })
        .where('id= :id', { id: column.id })
        .execute();
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES, { name: 'updateWorklist' })
  async regularUpdate(): Promise<void> {
    await this.updateDB();
    console.log('定时更新', moment().format('hh:mm:ss'));
  }

  // 获取详细工作情况，获取指定天数，或者获取所有天数
  async baseGetWorkStatus(
    options: findWorklistDto,
  ): Promise<v_worklist_viewer[]> {
    const result = await this.v_worklist.find({
      where: options.where,
    });
    return result;
  }

  async getWorkStatus(options: findWorklistDto): Promise<v_worklist_viewer[]> {
    const result = await this.baseGetWorkStatus(options);
    return result;
  }
}
