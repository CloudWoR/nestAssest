import { SignImage } from '@libs/local-db/holiday/signImage.model';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getModelForClass } from '@typegoose/typegoose';

@Controller('sign-image')
export class SignImageController {
  @ApiTags('自助获取医生签名')
  @Get(':doctor')
  async index(@Param('doctor') doctor: string) {
    const SignImageModel = getModelForClass(SignImage);
    const result = await SignImageModel.findOne({ doctorName: doctor });
    return result;
  }
}
