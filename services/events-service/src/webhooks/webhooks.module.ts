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
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{name: WebhookModel.name, schema: WebhookSchema}]),
    ClientsModule.registerAsync([{
      name: "WEBHOOKS_SERVICE",
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: Transport.GRPC,
        options: {
          package: "webhooks",
          protoPath: join(__dirname, "protos/webhooks.proto"),
          url: config.get<string>("GRPC_URL")
        }
      }),
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
