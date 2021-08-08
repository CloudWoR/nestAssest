import { Test, TestingModule } from '@nestjs/testing';
import { PacsdbService } from './pacsdb.service';

describe('PacsdbService', () => {
  let service: PacsdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacsdbService],
    }).compile();

    service = module.get<PacsdbService>(PacsdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
