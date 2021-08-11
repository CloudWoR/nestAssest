import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('NATS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello(): Observable<string> {
    const result = this.client.send<string>(
      { cmd: 'get-constomers' },
      '客户端发送',
    );
    return result;
  }
}
