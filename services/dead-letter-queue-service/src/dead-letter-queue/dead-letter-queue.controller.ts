import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeadLetterQueueService } from './dead-letter-queue.service';
import { RetryDeadLetterDto } from './dto/retry-dead-letter.dto';

@Controller('dead-letter-queue')
export class DeadLetterQueueController {
  constructor(private readonly deadLetterQueueService: DeadLetterQueueService) {}
  @Get()
  findAll() {
    return this.deadLetterQueueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deadLetterQueueService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deadLetterQueueService.remove(+id);
  }

  @Post(":id")
  retry(@Param('id') id: string, @Body() retryDeadLetterDto: RetryDeadLetterDto) {
    return this.deadLetterQueueService.retry(+id, retryDeadLetterDto);
  }
}
