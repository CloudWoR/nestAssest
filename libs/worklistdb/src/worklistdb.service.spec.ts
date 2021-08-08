import { Test, TestingModule } from '@nestjs/testing';
import { WorklistdbService } from './worklistdb.service';

describe('WorklistdbService', () => {
  let service: WorklistdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorklistdbService],
    }).compile();

    service = module.get<WorklistdbService>(WorklistdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
