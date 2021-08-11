import { Test, TestingModule } from '@nestjs/testing';
import { BrokerNatsController } from './broker-nats.controller';
import { BrokerNatsService } from './broker-nats.service';

describe('BrokerNatsController', () => {
  let brokerNatsController: BrokerNatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BrokerNatsController],
      providers: [BrokerNatsService],
    }).compile();

    brokerNatsController = app.get<BrokerNatsController>(BrokerNatsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(brokerNatsController.getHello()).toBe('Hello World!');
    });
  });
});
