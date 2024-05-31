import { Attributes, IRepository } from "src/shared/repositories/repository-interface";
import { EventType } from "../entities/event-type.entity";
import { EventTypeModel } from "../models/event-type.model";
import { InjectModel } from "@nestjs/sequelize";
import { EventTypeNotFoundException } from "../exceptions/event-type-not-found-exception";

export class EventTypeSequelizeRespository implements IRepository<EventType> {
    constructor(
        @InjectModel(EventTypeModel)
        private eventTypeModel: typeof EventTypeModel
    ) {}

    async count(where: Attributes = {}): Promise<number> {
        return this.eventTypeModel.count(where)
    }

    async findAll(where: Attributes = {}): Promise<EventType[]> {
        const eventTypes = await this.eventTypeModel.findAll({where});
        return eventTypes.map(
            (eventType) => new EventType(eventType.id, eventType.name)
        );
    }

    async findById(id: number): Promise<EventType> {
        const eventType = await this.eventTypeModel.findByPk(id);
        if (!eventType)
            throw new EventTypeNotFoundException(id)
        
        return new EventType(eventType.id, eventType.name);
    }

    async createMany(data: Partial<EventType>[]): Promise<boolean> {
        const created = await this.eventTypeModel.bulkCreate(data);
        return created.length == data.length;
    }

    create(data: Partial<EventType>): Promise<EventType> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: Partial<EventType>): Promise<EventType> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}