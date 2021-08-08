import { ApiProperty } from '@nestjs/swagger';
import { v_worklist_viewer } from 'libs/worklistdb/model/v_worklist_viewer.model';
import { FindConditions } from 'typeorm';

export interface dateFormatDto {
  startDate: string;
  endDate: string;
}

export class findWorklistDto {
  @ApiProperty({ description: '需要查询的日期', default: '20210414' })
  date?: string;
  @ApiProperty({ description: '指定设备类型', default: 'CT' })
  modalityType?: string;
  @ApiProperty({ description: '是否需要选择设备', default: 'CT_06TOSHIBA' })
  modality?: string;
  @ApiProperty({ description: '患者类型', default: '门诊' })
  patientType?: string;
  where?: FindConditions<v_worklist_viewer>;
}
