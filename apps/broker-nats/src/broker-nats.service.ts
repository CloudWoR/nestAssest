import { Injectable } from '@nestjs/common';

@Injectable()
export class BrokerNatsService {
  getHello(): string {
    return 'Hello World!';
  }
}
