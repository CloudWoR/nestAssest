import { Module } from '@nestjs/common';
import { ConfigTestService } from './config-test.service';
import { ConfigTestController } from './config-test.controller';
import { ConfigureModule } from '@libs/configure';

@Module({
  imports: [ConfigureModule],
  controllers: [ConfigTestController],
  providers: [ConfigTestService],
})
export class ConfigTestModule {}
