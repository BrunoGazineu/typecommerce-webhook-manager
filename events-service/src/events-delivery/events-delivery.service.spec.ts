import { Test, TestingModule } from '@nestjs/testing';
import { EventsDeliveryService } from './events-delivery.service';

describe('EventsService', () => {
  let service: EventsDeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsDeliveryService],
    }).compile();

    service = module.get<EventsDeliveryService>(EventsDeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
