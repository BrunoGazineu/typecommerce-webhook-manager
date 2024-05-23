import { Test, TestingModule } from '@nestjs/testing';
import { DeadLetterQueueService } from './dead-letter-queue.service';

describe('DeadLetterQueueService', () => {
  let service: DeadLetterQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeadLetterQueueService],
    }).compile();

    service = module.get<DeadLetterQueueService>(DeadLetterQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
