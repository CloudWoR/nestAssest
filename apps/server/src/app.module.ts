import { LocalDbModule } from '@libs/local-db';
// import { PacsdbModule } from '@libs/pacsdb';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { SignImageModule } from './sign-image/sign-image.module';
import { ConfigTestModule } from './config-test/config-test.module';
import { ConfigureModule } from 'libs/configure/src';
import configure from '../configure/configure';

@Module({
  imports: [
    LocalDbModule,
    // ReportModule,
    // PacsdbModule,
    // SignImageModule,
    ConfigModule.forRoot({
      // envFilePath: '.test.env',
      load: [configure],
      isGlobal: true,
    }),
    ConfigureModule,
    ConfigTestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: ConfigService,
    //   useValue: '.test.env',
    // },
  ],
})
export class AppModule {}
