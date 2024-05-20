import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from 'src/shared/repositories/repository-interface';
import { EventType } from './entities/event-type.entity';

@Injectable()
export class EventTypesService {
    constructor(
        @Inject("EventTypeRepository")
        private readonly eventTypeRepository: IRepository<EventType>
    ) {}

    async findAll() {
        return await this.eventTypeRepository.findAll();
    }
}
