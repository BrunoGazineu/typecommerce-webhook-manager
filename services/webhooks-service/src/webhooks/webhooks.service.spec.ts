import { WebhooksService } from './webhooks.service';
import { Webhook } from './entities/webhook.entity';
import { RepositoryInMemory } from '../shared/repositories/repository-in-memory';
import { WebhookNotFoundException } from './exceptions/webhook-not-found-exception';
import { EventType } from 'src/event-types/entities/event-type.entity';
import { HttpException } from '@nestjs/common';

class EventEmitterInMemory {
  constructor(public events: {type: string, event: any}[] = []) {}
  emit(type: string, event: any) {
    this.events.push({type, event})
  }
}

describe('WebhooksService', () => {
  let service: WebhooksService;
  let webhookRepository: RepositoryInMemory<Webhook>;
  let eventTypeRepository: RepositoryInMemory<EventType>
  let eventEmitter: EventEmitterInMemory

  beforeEach(async () => {
    webhookRepository = new RepositoryInMemory();
    eventTypeRepository = new RepositoryInMemory();
    eventEmitter = new EventEmitterInMemory();
    service = new WebhooksService(webhookRepository, eventTypeRepository, eventEmitter as any);
  });

  it('Should create a webhook', async () => {
    const eventType: EventType = {
      id: 1,
      name: "TEST_EVENT"
    }

    eventTypeRepository.create(eventType)

    const webhookData = {
      url: "www.test.com",
      name: "Test Webhook",
      event_types: ["TEST_EVENT"]
    }

    const webhook = await service.create({
      ...webhookData
    });

    expect(webhookRepository.items).toEqual([webhook])
    expect(eventEmitter.events[0].event).toEqual({webhook: webhook})
  });

  it('Should raise Unique Exception', async () => {
    eventTypeRepository.items.push({id: 1, name: "TEST_EVENT"})

    const webhook = createTestWebhook();
    webhookRepository.items.push(webhook);
    expect(service.create(webhook)).toThrow(HttpException);
  })

  it('Should get all webhooks', async () => {
  
    webhookRepository.items = Array(10).fill(0).map((index) => new Webhook(index+1, `TEST_${index+1}`, `www.${index+1}.com`, ["EVENT_"+index]));

    const webhooks = await service.findAll();

    expect(webhookRepository.items).toEqual(webhooks);
  });

  it('Should get a webhook by id', async () => {
    const testWebhook = createTestWebhook();
    webhookRepository.items.push(testWebhook);

    const webhook = await service.findOne(testWebhook.id)

    expect(testWebhook).toEqual(webhook);
  });

  it('Should throw a webhook not found exception when searching for an invalid id', async () => {
    expect(service.findOne(-1)).rejects.toThrow(WebhookNotFoundException);
  })

  it('Should update a webhook by id', async () => {
    const eventTypes: EventType[] = [{
        id: 1,
        name: "TEST_EVENT"
      },
      {
        id: 2,
        name: "TEST_EVENT_2"
      },
    ]

    eventTypeRepository.createMany(eventTypes)

    webhookRepository.items.push(createTestWebhook());

    const updateData = {url: "www.test_2.com", event_types: ["TEST_EVENT", "TEST_EVENT_2"]};
    const webhook = await service.update(1, updateData);

    expect(webhook).toEqual(new Webhook(1, "TEST_WEBHOOK", updateData.url, updateData.event_types));
    expect(eventEmitter.events[0].event).toEqual({webhook: webhook})
  });

  it('Should delete a webhook by id', async () => {
    webhookRepository.items.push(createTestWebhook());

    await service.remove(1);

    expect(webhookRepository.items.length).toEqual(0)
    expect(eventEmitter.events[0].event).toEqual({id: 1})
  })
});


function createTestWebhook() {
  return new Webhook(1, "TEST_WEBHOOK", "TEST_URL", ["TEST_EVENT"])
}