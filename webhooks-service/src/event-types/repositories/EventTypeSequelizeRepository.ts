import { IRepository } from "src/shared/repositories/repository-interface";
import { EventType } from "../entities/event-type.entity";
import { EventTypeModel } from "../models/event-type.model";
import { InjectModel } from "@nestjs/sequelize";

export class EventTypeSequelizeRespository implements IRepository<EventType> {
    constructor(
        @InjectModel(EventTypeModel)
        private eventTypeModel: typeof EventTypeModel
    ) {}

    async findAll(): Promise<EventType[]> {
        const eventTypes = await this.eventTypeModel.findAll();
        return eventTypes.map(
            (eventType) => new EventType(eventType.id, eventType.name)
        );
    }

    async findById(id: number): Promise<EventType> {
        const eventType = await this.eventTypeModel.findByPk(id);
        if (!eventType)
            throw new Error("EventType not found")
        
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