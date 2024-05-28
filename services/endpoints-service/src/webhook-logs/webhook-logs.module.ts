import { Module } from '@nestjs/common';
import { WebhookLogsService } from './webhook-logs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebhookLogModel } from './models/webhook-log.model';
import { EndpointModel } from 'src/endpoints/models/endpoint.model';
import { WebhookLogsController } from './webhook-logs.controller';
import { WebhookLogsWebsocketGateway } from './webhook-logs-websocket-gateway';

@Module({
  imports: [
    SequelizeModule.forFeature([WebhookLogModel, EndpointModel])
  ],
  controllers: [WebhookLogsController],
  providers: [
    WebhookLogsService,
    WebhookLogsWebsocketGateway,
  ],
})
export class WebhookLogsModule {}
