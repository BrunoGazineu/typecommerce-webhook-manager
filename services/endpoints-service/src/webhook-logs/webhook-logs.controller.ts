import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { WebhookLogsService } from './webhook-logs.service';

@Controller('api/webhooklogs')
export class WebhookLogsController {
  constructor(private readonly webhookLogsService: WebhookLogsService) {}

  @Get()
  findRecent(@Query('limit', ParseIntPipe) limit?: number) {
    return this.webhookLogsService.getByLimit(limit)
  }
}