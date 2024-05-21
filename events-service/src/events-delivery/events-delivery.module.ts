import { Logger, Module } from '@nestjs/common';
import { EventsDeliveryService } from './events-delivery.service';
import { EventsDeliveryController } from './events-delivery.controller';
import { HttpModule } from '@nestjs/axios';
import { HttpDeliveryService } from './delivery/http-delivery-service';
import { WebhookMongooseGateway } from 'src/webhooks/gateways/webhook-mongoose-gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookModel, WebhookSchema } from 'src/webhooks/models/webhook.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: WebhookModel.name, schema: WebhookSchema}]),
    HttpModule.register({
      timeout: 10000,
    })
  ],
  controllers: [EventsDeliveryController],
  providers: [
    EventsDeliveryService,
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
  ],
})
export class EventsDeliveryModule {}
