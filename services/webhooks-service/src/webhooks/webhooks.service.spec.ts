import { WebhooksService } from './webhooks.service';
import { Webhook } from './entities/webhook.entity';
import { RepositoryInMemory } from '../shared/repositories/repository-in-memory';
import { WebhookNotFoundException } from './exceptions/webhook-not-found-exception';

const eventEmitterMock = {
  emit: jest.fn()
}

describe('WebhooksService', () => {
  let service: WebhooksService;
  let webhookRepository: RepositoryInMemory<Webhook>;

  beforeEach(async () => {
    webhookRepository = new RepositoryInMemory();
    service = new WebhooksService(webhookRepository, eventEmitterMock as any);
  });

  it('Should create a webhook', async () => {
    const webhookData = {
      url: "www.test.com",
      name: "Test Webhook",
      event_types: ["TEST_EVENT"]
    }

    const webhook = await service.create({
      ...webhookData
    });

    expect(webhookRepository.items).toEqual([webhook])
  });

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
    webhookRepository.items.push(createTestWebhook());

    const updateData = {name: "TEST_WEBHOOK_2", url: "www.test_2.com", event_types: ["TEST_EVENT", "TEST_EVENT_2"]};
    const webhook = await service.update(1, updateData);

    expect(webhook).toEqual(new Webhook(1, updateData.name, updateData.url, updateData.event_types));
  });

  it('Should delete a webhook by id', async () => {
    webhookRepository.items.push(createTestWebhook());

    await service.remove(1);

    expect(webhookRepository.items.length).toEqual(0)
  })
});


function createTestWebhook() {
  return new Webhook(1, "TEST_WEBHOOK", "TEST_URL", ["TEST_EVENT"])
}