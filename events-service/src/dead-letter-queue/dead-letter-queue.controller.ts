import { Controller, Get } from '@nestjs/common';
import { DeadLetterQueueService } from './dead-letter-queue.service';

@Controller('api/dead-letter-queue')
export class DeadLetterQueueController {
  constructor(private readonly deadLetterQueueService: DeadLetterQueueService) {}

  @Get()
  findAll() {
    return this.deadLetterQueueService.findAll()
  }
}
