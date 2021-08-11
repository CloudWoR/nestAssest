import { Module } from '@nestjs/common';
import { BrokerNatsController } from './broker-nats.controller';
import { BrokerNatsService } from './broker-nats.service';

@Module({
  imports: [],
  controllers: [BrokerNatsController],
  providers: [BrokerNatsService],
})
export class BrokerNatsModule {}
