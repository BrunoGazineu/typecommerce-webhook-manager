import { Module } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { EndpointsController } from './endpoints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndpointModel } from './models/endpoint.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([EndpointModel])
  ],
  controllers: [EndpointsController],
  providers: [EndpointsService],
})
export class EndpointsModule {
}
