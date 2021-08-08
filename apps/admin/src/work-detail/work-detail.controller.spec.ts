import { Test, TestingModule } from '@nestjs/testing';
import { WorkDetailController } from './work-detail.controller';

describe('WorkDetailController', () => {
  let controller: WorkDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkDetailController],
    }).compile();

    controller = module.get<WorkDetailController>(WorkDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
