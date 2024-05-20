import { Logger, Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookModel, WebhookSchema } from './models/webhook.model';
import { WebhookMongooseGateway } from './gateways/webhook-mongoose-gateway';
import { WebhooksController } from './webhooks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: WebhookModel.name, schema: WebhookSchema}]),
  ],
  controllers: [WebhooksController],
  providers: [
    WebhooksService,
    Logger,
    WebhookMongooseGateway,
    {
      provide: 'WebhookGateway',
      useExisting: WebhookMongooseGateway
    }
  ],
})
export class WebhooksModule {}
