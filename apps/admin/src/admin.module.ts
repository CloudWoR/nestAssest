import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
