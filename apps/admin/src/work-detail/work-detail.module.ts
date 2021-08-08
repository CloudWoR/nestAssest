import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { worklist } from 'libs/worklistdb/model/worklist.model';
import { RandomDate } from './calss/randomDate.class';
import { WorkDetailController } from './work-detail.controller';
import { WorkDetailMiddleware } from './work-detail.middleware';
import { WorkDetailService } from './work-detail.service';

@Module({
  // 导入pacs视图模型
  imports: [TypeOrmModule.forFeature([worklist], 'workdb')],
  controllers: [WorkDetailController],
  providers: [WorkDetailService, RandomDate],
})
export class WorkDetailModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WorkDetailMiddleware).forRoutes('work-detail');
  }
}
