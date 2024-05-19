import { Controller } from '@nestjs/common';
import { EventTypesService } from './event-types.service';

@Controller('event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}
}
