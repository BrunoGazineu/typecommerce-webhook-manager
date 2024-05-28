import { Body, Controller, Post } from '@nestjs/common';
import { EventsDeliveryService } from './events-delivery.service';
import { SendEventDto } from './dto/send-event.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { WebhookEvent } from './entities/webhook-event.entity';

@Controller('api/events-delivery')
export class EventsDeliveryController {
  constructor(private readonly eventsService: EventsDeliveryService) {}

  @Post()
  send(@Body() sendEventDto: SendEventDto) {
    return this.eventsService.send(sendEventDto);
  }

  @EventPattern("retry-event")
  retry(@Payload() event: WebhookEvent) {
    return this.eventsService.processEventDelivery(event);
  }
}
