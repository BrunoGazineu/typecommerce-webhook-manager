import { Logger, Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebhookModel } from './models/webhook.model';
import { WebhookEventTypeModel } from './models/webhook-event-type.model';
import { WebhookSequelizeRespository } from './repositories/webhook-sequelize-repository';
import { EventTypeModel } from 'src/event-types/models/event-type.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublishWebhookCreatedListener } from './listeners/publish-webhook-created.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PublishWebhookUpdatedListener } from './listeners/publish-webhook-updated.listener';
import { PublishWebhookDeletedListener } from './listeners/publish-webhook-deleted.listener';
import { WebhooksSeedService } from './webhooks.seed.service';

@Module({
  imports: [
    SequelizeModule.forFeature([WebhookModel, WebhookEventTypeModel, EventTypeModel]),
    ClientsModule.register([
      {
        name: 'WEBHOOKS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://guest:guest@localhost:5672"], // TEMP
          queue: 'webhook-queue',
        }
      }
    ]),
  ],
  controllers: [WebhooksController],
  providers: [
    WebhooksService,
    WebhooksSeedService,
    Logger,
    PublishWebhookCreatedListener,
    PublishWebhookUpdatedListener,
    PublishWebhookDeletedListener,
    WebhookSequelizeRespository,
    {
      provide: 'WebhookRepository',
      useExisting: WebhookSequelizeRespository
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2
    }
  ],
})
export class WebhooksModule {}
