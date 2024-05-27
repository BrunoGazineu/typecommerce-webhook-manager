import { Injectable } from '@nestjs/common';
import { CreateWebhookLogDto } from './dto/create-webhook-log.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WebhookLogModel } from './models/webhook-log.model';

@Injectable()
export class WebhookLogsService 
{
  constructor(
    @InjectModel(WebhookLogModel)
    private readonly webhookLogModel: typeof WebhookLogModel
  ) {}
  async create(createWebhookLogDto: CreateWebhookLogDto) {
    console.log("Creating webhook log")
    await this.webhookLogModel.create(createWebhookLogDto);
  }

  async getByLimit(limit: number = 15) {
    return this.webhookLogModel.findAll({limit: limit});
  }
}
