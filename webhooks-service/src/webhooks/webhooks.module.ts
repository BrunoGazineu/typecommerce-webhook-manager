import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebhookModel } from './models/webhook.model';
import { WebhookEventTypeModel } from './models/webhook-event-type.model';

@Module({
  imports: [
    SequelizeModule.forFeature([WebhookModel, WebhookEventTypeModel])
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule {}
