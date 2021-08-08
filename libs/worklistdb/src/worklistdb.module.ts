import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v_worklist_viewer } from '../model/v_worklist_viewer.model';
import { worklist } from '../model/worklist.model';
import { WorklistSubscriber } from '../subscriber/worklist.subscriber';
import { WorklistdbService } from './worklistdb.service';

const model = TypeOrmModule.forFeature([worklist, v_worklist_viewer], 'workdb');

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'workdb',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Cloud667232io61',
      database: 'worklist',
      entities: [worklist, v_worklist_viewer],
      subscribers: [],
      synchronize: true,
    }),
    model,
  ],
  providers: [WorklistdbService],
  exports: [WorklistdbService, model],
})
export class WorklistdbModule {}
