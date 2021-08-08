import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { worklist } from '../model/worklist.model';
import * as moment from 'momnet';

@EventSubscriber()
export class WorklistSubscriber implements EntitySubscriberInterface<worklist> {
  private readonly today = moment().format('YYYY-MM-DD');
  private targetColumn: string[] = [
    'DJTime',
    'StudyDateTime',
    'ReportDateTime',
    'ApproveDateTime',
  ];

  listenTo() {
    return worklist;
  }

  beforeUpdate(update: UpdateEvent<worklist>) {
    // this.updateDateToToday(update);
  }
}
