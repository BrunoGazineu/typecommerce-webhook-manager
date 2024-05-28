import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { DeadLetterQueueService } from './dead-letter-queue.service';
import { DeadLetterRetryDto } from './dto/dead-letter-retry.dto';

@Controller('api/dead-letter-queue')
export class DeadLetterQueueController {
  constructor(
    private readonly deadLetterQueueService: DeadLetterQueueService,
    private readonly logger: Logger
  ) {}

  @Get()
  findAll() {
    this.logger.log("[Dead Letter Queue] Find All")
    return this.deadLetterQueueService.findAll()
  }

  @Get(":id")
  findOne(@Param('id') id: string) {
    return this.deadLetterQueueService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param('id') id: string) {
    return this.deadLetterQueueService.remove(+id);
  }

  @Post(":id")
  retry(@Param('id') id: string, @Body() deadLetterRetryDto: DeadLetterRetryDto) {
    return this.deadLetterQueueService.retry(+id, deadLetterRetryDto);
  }

}
