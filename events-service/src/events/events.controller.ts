import { Body, Controller, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { SendEventDto } from './dto/send-event.dto';

@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  send(@Body() sendEventDto: SendEventDto) {
    return this.eventsService.send(sendEventDto);
  }
}
