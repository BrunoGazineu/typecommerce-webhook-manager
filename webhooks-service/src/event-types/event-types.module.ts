import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventTypeModel } from './models/event-type.model';
import { EventTypeSequelizeRespository } from './repositories/EventTypeSequelizeRepository';
import { EventTypeSeedService } from './event-types.seed.service';

@Module({
  imports: [
    SequelizeModule.forFeature([EventTypeModel])
  ],
  controllers: [EventTypesController],
  providers: [
    EventTypesService,
    EventTypeSeedService,
    EventTypeSequelizeRespository,
    {
      provide: "EventTypeRepository",
      useExisting: EventTypeSequelizeRespository
    }
  ],
})
export class EventTypesModule {}
