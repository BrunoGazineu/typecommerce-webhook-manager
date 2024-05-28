import { Logger, Module } from '@nestjs/common';
import { EventsDeliveryService } from './events-delivery.service';
import { EventsDeliveryController } from './events-delivery.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpDeliveryService } from './delivery/http-delivery-service';
import { WebhookMongooseGateway } from 'src/webhooks/gateways/webhook-mongoose-gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookModel, WebhookSchema } from 'src/webhooks/models/webhook.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublishDeliveryErrorToDeadLetterQueueListener } from './listeners/publish-delivery-error-to-dead-letter-queue.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: WebhookModel.name, schema: WebhookSchema},
    ]),
    HttpModule.register({
      timeout: 10000,
    }),
    ClientsModule.registerAsync([
      {
        name: 'DEAD_LETTER_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>("RABBITMQ_URL")],
            queue: 'dead-letter-queue',
          }
        })
      }
    ]),
  ],
  controllers: [EventsDeliveryController],
  providers: [
    EventsDeliveryService,
    Logger,
    PublishDeliveryErrorToDeadLetterQueueListener,
    HttpDeliveryService,
    {
      provide: "IDeliveryService",
      useExisting: HttpDeliveryService,
    },
    WebhookMongooseGateway,
    {
      provide: 'WebhookPersistentGateway',
      useExisting: WebhookMongooseGateway
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2
    }
  ],
})
export class EventsDeliveryModule {}
