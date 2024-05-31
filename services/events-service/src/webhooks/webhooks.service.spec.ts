import { RepositoryInMemory } from '../shared/gateways/gateway-in-memory';
import { WebhooksService } from './webhooks.service';
import { Webhook } from './entities/webhook.entity';

describe('WebhookService', () => {
  let service: WebhooksService;
  let webhookGateway: RepositoryInMemory<Webhook>

  beforeEach(async () => {
    webhookGateway = new RepositoryInMemory();
    service = new WebhooksService(webhookGateway);
  });

  it('Should Create Webhook', async () => {
    const webhook = createTestWebhook() 
    await service.create(webhook)

    expect(webhookGateway.items).toEqual([webhook]);
  });

  it('Should Update Webhook', async () => {
    webhookGateway.items.push(createTestWebhook())
    
    const webhook = {id: 1, name: "Test Webhook", url: "http://test2", event_types: ["TEST_EVENT", "TESTE_EVENT2"]}

    await service.update(webhook)

    expect(webhookGateway.items).toEqual([webhook])
  })

  it('Should Delete Webhook', async () => {
    webhookGateway.items.push(createTestWebhook());

    await service.delete(1);

    expect(webhookGateway.items.length).toEqual(0)
  })

});

function createTestWebhook() {
  return new Webhook(1, "Test Webhook", "http://test", ["TEST_EVENT"])
}