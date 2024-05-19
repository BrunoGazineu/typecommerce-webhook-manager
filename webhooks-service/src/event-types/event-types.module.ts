import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventTypeModel } from './models/event-type.model';

@Module({
  imports: [
    SequelizeModule.forFeature([EventTypeModel])
  ],
  controllers: [EventTypesController],
  providers: [EventTypesService],
})
export class EventTypesModule {}
