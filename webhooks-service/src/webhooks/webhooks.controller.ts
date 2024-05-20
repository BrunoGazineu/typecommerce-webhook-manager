import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Logger } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Response } from 'express';

@Controller('api/webhooks')
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksService,
    private readonly logger: Logger
  ) {}

  @Post()
  create(@Body() createWebhookDto: CreateWebhookDto) {
    this.logger.log("[WebhookController] Create")
    return this.webhooksService.create(createWebhookDto);
  }

  @Get()
  findAll() {
    this.logger.log("[WebhookController] FindAll")
    return this.webhooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log("[WebhookController] FindOne")
    return this.webhooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    this.logger.log("[WebhookController] Update")
    return this.webhooksService.update(+id, updateWebhookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.logger.log("[WebhookController] Delete")
    if(this.webhooksService.remove(+id))
      return res.status(204).send();
  }
}
