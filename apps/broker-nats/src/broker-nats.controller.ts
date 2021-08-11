import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BrokerNatsService } from './broker-nats.service';

@Controller()
export class BrokerNatsController {
  constructor(private readonly brokerNatsService: BrokerNatsService) {}

  @Get()
  getHello(): string {
    return this.brokerNatsService.getHello();
  }

  @MessagePattern('get-customers')
  getCustomers(@Payload() data: any) {
    return 'NATS网关: ' + data;
  }
}
