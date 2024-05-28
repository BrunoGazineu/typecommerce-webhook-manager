import { Test, TestingModule } from '@nestjs/testing';
import { EventsDeliveryController } from './events-delivery.controller';
import { EventsDeliveryService } from './events-delivery.service';

describe('EventsController', () => {
  let controller: EventsDeliveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsDeliveryController],
      providers: [EventsDeliveryService],
    }).compile();

    controller = module.get<EventsDeliveryController>(EventsDeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
