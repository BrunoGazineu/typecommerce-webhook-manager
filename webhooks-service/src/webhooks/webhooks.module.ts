import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebhookModel } from './models/webhook.model';
import { WebhookEventTypeModel } from './models/webhook-event-type.model';
import { WebhookSequelizeRespository } from './repositories/WebhookSequelizeRepository';
import { EventTypeModel } from 'src/event-types/models/event-type.model';

@Module({
  imports: [
    SequelizeModule.forFeature([WebhookModel, WebhookEventTypeModel, EventTypeModel])
  ],
  controllers: [WebhooksController],
  providers: [
    WebhooksService,
    WebhookSequelizeRespository,
    {
      provide: 'WebhookRepository',
      useExisting: WebhookSequelizeRespository
    }
  ],
})
export class WebhooksModule {}
