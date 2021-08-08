import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configure from 'apps/server/configure/configure';
import { ConfigureService } from './configure.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configure],
    }),
  ],
  providers: [ConfigureService],
  exports: [ConfigureService],
})
export class ConfigureModule {}
