import { Test, TestingModule } from '@nestjs/testing';
import { DeadLetterQueueController } from './dead-letter-queue.controller';
import { DeadLetterQueueService } from './dead-letter-queue.service';

describe('DeadLetterQueueController', () => {
  let controller: DeadLetterQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeadLetterQueueController],
      providers: [DeadLetterQueueService],
    }).compile();

    controller = module.get<DeadLetterQueueController>(DeadLetterQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
