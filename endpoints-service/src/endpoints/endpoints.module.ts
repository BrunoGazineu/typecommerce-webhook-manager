import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { EndpointsController } from './endpoints.controller';
import { EndpointModel } from './models/endpoint.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EndpointMiddleware } from './endpoints.middleware';
import { WebhookLogModel } from 'src/webhook-logs/models/webhook-log.model';
import { WebhookLogsService } from 'src/webhook-logs/webhook-logs.service';
import { WebhookLogsWebsocketGateway } from 'src/webhook-logs/webhook-logs-websocket-gateway';

@Module({
  imports: [
    SequelizeModule.forFeature([EndpointModel, WebhookLogModel])
  ],
  controllers: [EndpointsController],
  providers: [
    EndpointsService,
    EndpointMiddleware,
    WebhookLogsWebsocketGateway,
    WebhookLogsService,
  ],
})
export class EndpointsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EndpointMiddleware)
      .exclude('/api/(.*)')
      .forRoutes("*")
  }
}
