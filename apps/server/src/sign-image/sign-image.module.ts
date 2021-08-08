import { Module } from '@nestjs/common';
import { SignImageController } from './sign-image.controller';

@Module({
  controllers: [SignImageController],
})
export class SignImageModule {}
