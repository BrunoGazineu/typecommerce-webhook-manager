import { Logger, Module } from '@nestjs/common';
import { EventsDeliveryService } from './events-delivery.service';
import { EventsDeliveryController } from './events-delivery.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpDeliveryService } from './delivery/http-delivery-service';
import { WebhookMongooseGateway } from 'src/webhooks/gateways/webhook-mongoose-gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookModel, WebhookSchema } from 'src/webhooks/models/webhook.model';
import { DeadLetterMongooseGateway } from 'src/dead-letter-queue/gateways/dead-letter-mongoose-gateway';
import { DeadLetterModel, DeadLetterSchema } from 'src/dead-letter-queue/models/dead-letter.model';
import { DeadLetterQueueService } from 'src/dead-letter-queue/dead-letter-queue.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: WebhookModel.name, schema: WebhookSchema},
      {name: DeadLetterModel.name, schema: DeadLetterSchema}
    ]),
    HttpModule.register({
      timeout: 10000,
    })
  ],
  controllers: [EventsDeliveryController],
  providers: [
    EventsDeliveryService,
    DeadLetterQueueService,
    Logger,
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
    DeadLetterMongooseGateway,
    {
      provide: "DeadLetterGateway",
      useExisting: DeadLetterMongooseGateway
    }
  ],
})
export class EventsDeliveryModule {}
