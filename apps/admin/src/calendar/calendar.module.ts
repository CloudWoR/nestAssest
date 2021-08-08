import { HttpModule, Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';

@Module({
  imports: [HttpModule],
  controllers: [CalendarController],
})
export class CalendarModule {}
