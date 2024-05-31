import { EventTypesService } from './event-types.service';
import { RepositoryInMemory } from '../shared/repositories/repository-in-memory';
import { EventType } from './entities/event-type.entity';

describe('EventTypesService', () => {
  let service: EventTypesService;
  let eventTypeRepository: RepositoryInMemory<EventType>

  beforeEach(async () => {
    eventTypeRepository = new RepositoryInMemory();
    service = new EventTypesService(eventTypeRepository);
  });

  it('Should get all Event Types', async () => {
    eventTypeRepository.items = Array(10).fill(0).map((index) => new EventType(index+1, `TEST_${index+1}`));

    const webhooks = await service.findAll();

    expect(eventTypeRepository.items).toEqual(webhooks);
  });
});
