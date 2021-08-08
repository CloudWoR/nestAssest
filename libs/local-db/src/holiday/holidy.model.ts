import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';

// 模型字段配置
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Holiday {
  @ApiProperty({
    description: '年份',
    example: 2021,
  })
  @prop({ required: true })
  year: number;

  @ApiProperty({
    description: '关键日期',
    example: '02-20',
  })
  @prop({ required: true })
  keyDay: string;

  @ApiProperty({
    description: '是否为节假日？',
    example: true,
  })
  @prop({ required: true })
  holiday: boolean;

  @ApiProperty({
    description: '节假日名称',
    example: '春节',
  })
  @prop({ required: true })
  holidayName: string;

  @ApiProperty({
    description: '放假天数',
    example: 2,
  })
  @prop({ required: true })
  wage: number;

  @ApiProperty({
    description: '日期',
    example: '2021-04-04',
  })
  @prop({ unique: true, required: true })
  date: string;
}
