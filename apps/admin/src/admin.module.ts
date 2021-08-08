import { LocalDbModule } from '@libs/local-db';
import { PacsdbModule } from '@libs/pacsdb';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WorklistdbModule } from 'libs/worklistdb/src';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CalendarModule } from './calendar/calendar.module';
import { SignImageModule } from './sign-image/sign-image.module';
import { WorkDetailModule } from './work-detail/work-detail.module';

@Module({
  imports: [
    LocalDbModule,
    CalendarModule,
    SignImageModule,
    WorkDetailModule,
    WorklistdbModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
