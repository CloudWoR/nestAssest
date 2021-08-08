import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tReportInfoKiosk } from '@libs/pacsdb/model/tReportInfoKiosk.model';

@Module({
  imports: [TypeOrmModule.forFeature([tReportInfoKiosk])],
  controllers: [ReportController],
})
export class ReportModule {}
