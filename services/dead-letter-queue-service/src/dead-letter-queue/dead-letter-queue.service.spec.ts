import { IPublisher } from "src/shared/publishers/publisher-interface";
import { DeadLetterQueueService } from "./dead-letter-queue.service";
import { DeadLetter } from "./entities/dead-letter.entity";
import { GatewayInMemory } from "./gateways/in-memory-gateway";
import { Observable } from "rxjs";
import { WebhookEvent } from "./entities/webhook-event.entity";

class MockEventPublisher implements IPublisher {
  events: {pattern: string, data: WebhookEvent}[] = []
  constructor() {
    this.events = []
  }
  emit<R = any, T = any>(pattern: string, data: any): Observable<R> {
    this.events.push({pattern, data})
    return
  }

}

describe('DeadLetterQueueService', () => {
  let service: DeadLetterQueueService;
  let deadLetterGateway: GatewayInMemory<DeadLetter>;
  let mockEventPublisher: MockEventPublisher;

  beforeEach(async () => {
    deadLetterGateway = new GatewayInMemory();
    mockEventPublisher = new MockEventPublisher();
    service = new DeadLetterQueueService(deadLetterGateway, mockEventPublisher, console as any);
  });

  it('Should create a Dead Letter', async () => {
    const deadLetter = createTestDeadLetter();

    await service.create(deadLetter)

    expect(deadLetterGateway.items).toEqual([deadLetter])
  });

  it('Should get all dead letters', async () => {

    deadLetterGateway.items = Array(10).fill(0).map((index) => new DeadLetter(index+1, {message: `Test_${index+1}`, method: "EVENT_TYPE", url: "http://test"}, new Date, "Error"));

    const webhooks = await service.findAll();

    expect(deadLetterGateway.items).toEqual(webhooks);
  });

  it('Should get a dead letter by id', async () => {
    const testDeadletter = createTestDeadLetter();
    deadLetterGateway.items.push(testDeadletter);

    const webhook = await service.findOne(testDeadletter.id)

    expect(testDeadletter).toEqual(webhook);
  });

  it('Should delete a dead letter by id', async () => {
    const testDeadLetter = createTestDeadLetter();
    deadLetterGateway.items.push(createTestDeadLetter());

    await service.remove(testDeadLetter.id);

    expect(deadLetterGateway.items.length).toEqual(0)
  });

  it("Sould retry dead letter by id", async () => {
    const testDeadLetter = createTestDeadLetter();
    deadLetterGateway.items.push(createTestDeadLetter());

    await service.retry(testDeadLetter.id, {})

    expect(mockEventPublisher.events[0].data).toEqual({url: "http://test", method: "TEST_EVENT", message: "test"} as WebhookEvent)
  })
});


function createTestDeadLetter() : DeadLetter {
  return {
    id: "1",
    event: {
      url: "http://test",
      message: "test",
      method: "TEST_EVENT"
    },
    created: new Date(),
    error: "Error"
  }
}