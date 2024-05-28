import { Logger, Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookModel, WebhookSchema } from './models/webhook.model';
import { WebhookMongooseGateway } from './gateways/webhook-mongoose-gateway';
import { WebhooksController } from './webhooks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WebhookGRPCGateway } from './gateways/webhook-grpc-gateway';
import { WebhooksSyncService } from './webhooks.sync.service';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{name: WebhookModel.name, schema: WebhookSchema}]),
    ClientsModule.register([{
      name: "WEBHOOKS_SERVICE",
      transport: Transport.GRPC,
      options: {
        package: "webhooks",
        protoPath: join(__dirname, "protos/webhooks.proto"),
        url: "localhost:50001"
      }
    }])
  ],
  controllers: [WebhooksController],
  providers: [
    WebhooksService,
    WebhooksSyncService,
    Logger,
    WebhookMongooseGateway,
    {
      provide: 'WebhookPersistentGateway',
      useExisting: WebhookMongooseGateway
    },
    WebhookGRPCGateway,
    {
      provide: 'WebhookHttpGateway',
      useExisting: WebhookGRPCGateway
    }
  ],
})
export class WebhooksModule {}
