import { Test, TestingModule } from '@nestjs/testing';
import { RateLimitStorageService } from './throttler.service';

describe('ThrottlerService', () => {
  let service: RateLimitStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateLimitStorageService],
    }).compile();

    service = module.get<RateLimitStorageService>(RateLimitStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});