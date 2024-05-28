import { Controller, Get } from '@nestjs/common';
import { EventTypesService } from './event-types.service';

@Controller('api/event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @Get()
  findAll() {
    return this.eventTypesService.findAll();
  }
}
