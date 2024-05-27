import { Module } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { EndpointsController } from './endpoints.controller';
import { EndpointModel } from './models/endpoint.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([EndpointModel])
  ],
  controllers: [EndpointsController],
  providers: [EndpointsService],
})
export class EndpointsModule {
}
