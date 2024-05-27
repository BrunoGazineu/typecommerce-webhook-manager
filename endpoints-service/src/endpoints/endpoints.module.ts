import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { EndpointsController } from './endpoints.controller';
import { EndpointModel } from './models/endpoint.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EndpointMiddleware } from './endpoints.middleware';

@Module({
  imports: [
    SequelizeModule.forFeature([EndpointModel])
  ],
  controllers: [EndpointsController],
  providers: [
    EndpointsService,
    EndpointMiddleware
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
