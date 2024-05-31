import { RepositoryInMemory } from '../shared/gateways/gateway-in-memory';
import { EventsDeliveryService } from './events-delivery.service';
import { InMemoryDeliveryService } from './delivery/in-memory-delivery-service';
import { logger } from '@effect/platform/Http/Middleware';
import { Webhook } from '../webhooks/entities/webhook.entity';

class EventEmitterInMemory {
  constructor(public events: {type: string, event: any}[] = []) {}
  emit(type: string, event: any) {
    this.events.push({type, event})
  }
}

class ConfigServiceMock {
  get(name) {
    return {
      "DELIVERY_RETRIES": 3,
      "TIMEOUT": 10000
    }[name]
  }
}

describe('EventDeliveryService', () => {
  let service: EventsDeliveryService;
  let webhookGateway: RepositoryInMemory<Webhook>;
  let deliveryService: InMemoryDeliveryService;
  let eventDeliveryInMemory: EventEmitterInMemory
  let configServiceMock: ConfigServiceMock

  beforeEach(async () => {
    webhookGateway = new RepositoryInMemory();
    deliveryService = new InMemoryDeliveryService();
    eventDeliveryInMemory = new EventEmitterInMemory();
    configServiceMock = new ConfigServiceMock();
    service = new EventsDeliveryService(deliveryService, webhookGateway, eventDeliveryInMemory as any, configServiceMock as any, console as any);
  });

  it('Should Send Event', async () => {
    const webhook = createTestWebhook();
    webhookGateway.items.push(webhook)
    const event = {message: "hello", event_type: "TEST_EVENT"}
    await service.send(event)

    expect(deliveryService.deliveries).toEqual([{message: "hello", method: "TEST_EVENT", url: "http://test"}]);
  });
  
  it('Should fail Evet Sent', async () => {
    const webhook = createTestWebhook();
    webhookGateway.items.push(webhook)
    const event = {message: "hello", event_type: "TEST_EVENT"}
    deliveryService.returnError = true;
    await service.send(event)
    expect(eventDeliveryInMemory.events[0].event).toEqual({"deadLetter": {"error": "Error", "event": {"message": "hello", "method": "TEST_EVENT", "url": "http://test"}}})
  }) 

});

function createTestWebhook() {
  return new Webhook(1, "Test Webhook", "http://test", ["TEST_EVENT"])
}