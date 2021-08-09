import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configureInLibs from 'libs/configure/configure/configure';
import { ConfigureService } from './configure.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configureInLibs],
    }),
  ],
  providers: [ConfigureService],
  exports: [ConfigureService],
})
export class ConfigureModule {}
