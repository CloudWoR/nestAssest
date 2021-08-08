import { Test, TestingModule } from '@nestjs/testing';
import { WorkDetailService } from './work-detail.service';

describe('WorkDetailService', () => {
  let service: WorkDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkDetailService],
    }).compile();

    service = module.get<WorkDetailService>(WorkDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
