import { SignImage } from '@libs/local-db/holiday/signImage.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: SignImage,
})
@ApiTags('医生签名管理')
@Controller('sign-image')
export class SignImageController {
  constructor(@InjectModel(SignImage) private readonly model) {}
}
