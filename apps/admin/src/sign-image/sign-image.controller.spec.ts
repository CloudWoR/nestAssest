import { Test, TestingModule } from '@nestjs/testing';
import { SignImageController } from './sign-image.controller';

describe('SignImageController', () => {
  let controller: SignImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignImageController],
    }).compile();

    controller = module.get<SignImageController>(SignImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
