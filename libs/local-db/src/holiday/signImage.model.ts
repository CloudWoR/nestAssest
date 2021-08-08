import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';

// 模型字段配置
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class SignImage {
  @ApiProperty({
    description: '工号',
    example: '1588',
  })
  @prop({ required: false })
  jobNumber: string;

  @ApiProperty({
    description: '姓名',
    example: '姓名',
  })
  @prop({ required: true })
  doctorName: string;

  @ApiProperty({
    description: '分组',
    example: '诊断组 | 审核组',
  })
  @prop({ required: true })
  group: string;

  @ApiProperty({
    description: '有无审核权',
    example: true,
  })
  @prop({ required: true })
  auditRight: boolean;

  @ApiProperty({
    description: '签名图片',
    example: 'base64',
  })
  @prop({ required: true })
  signImage: string;
}
