import { Body, Controller, Post } from '@nestjs/common';
import { EventsDeliveryService } from './events-delivery.service';
import { SendEventDto } from './dto/send-event.dto';

@Controller('api/events')
export class EventsDeliveryController {
  constructor(private readonly eventsService: EventsDeliveryService) {}

  @Post()
  send(@Body() sendEventDto: SendEventDto) {
    return this.eventsService.send(sendEventDto);
  }
}
