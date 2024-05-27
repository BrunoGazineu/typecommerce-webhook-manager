import { Inject, Injectable } from '@nestjs/common';
import { CreateWebhookLogDto } from './dto/create-webhook-log.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WebhookLogModel } from './models/webhook-log.model';
import {  } from 'stream';
import { WebhookLogsWebsocketGateway } from './webhook-logs-websocket-gateway';

@Injectable()
export class WebhookLogsService 
{
  constructor(
    @InjectModel(WebhookLogModel)
    private readonly webhookLogModel: typeof WebhookLogModel,
    private readonly webhookLogsWebsocketGateway: WebhookLogsWebsocketGateway
  ) {}
  async create(createWebhookLogDto: CreateWebhookLogDto) {
    const webhookLog = await this.webhookLogModel.create(createWebhookLogDto);
    this.webhookLogsWebsocketGateway.sendNewWebhookLog(createWebhookLogDto.endpointId, webhookLog)
  }

  async getByLimit(limit: number = 15) {
    return this.webhookLogModel.findAll({limit: limit});
  }
}
