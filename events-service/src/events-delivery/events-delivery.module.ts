import { Module } from '@nestjs/common';
import { EventsDeliveryService } from './events-delivery.service';
import { EventsDeliveryController } from './events-delivery.controller';

@Module({
  controllers: [EventsDeliveryController],
  providers: [EventsDeliveryService],
})
export class EventsDeliveryModule {}
