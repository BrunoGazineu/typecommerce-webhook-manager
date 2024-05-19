import { IRepository } from "src/shared/repositories/repository-interface";
import { Webhook } from "../entities/webhook.entity";
import { InjectModel } from "@nestjs/sequelize";
import { WebhookModel } from "../models/webhook.model";
import { EventTypeModel } from "src/event-types/models/event-type.model";

export class EventTypeSequelizeRespository implements IRepository<Webhook> {
    constructor(
        @InjectModel(WebhookModel)
        private readonly webhookModel: typeof WebhookModel,
        @InjectModel(EventTypeModel)
        private readonly eventTypeModel: typeof EventTypeModel
    ) {}

    async findAll(): Promise<Webhook[]> {
        const webhooks = await this.webhookModel.findAll({ include: EventTypeModel });
        return webhooks.map(
            (webhook) => (
                new Webhook(
                    webhook.id,
                    webhook.name,
                    webhook.url,
                    webhook.getEventTypes()
                )
            )
        );
    }
    async findById(id: number): Promise<Webhook> {
        const webhook = await this.webhookModel.findByPk(id, { include: EventTypeModel });
        if (!webhook)
            throw Error("Webhook not found")

        return new Webhook(webhook.id, webhook.name, webhook.url, webhook.getEventTypes());
    }
    async create(data: Partial<Webhook>): Promise<Webhook> {
        const {eventTypes, ...webhookData} = data;
        const existingEventTypes = await this.eventTypeModel.findAll({ where: { name: eventTypes } });

        if (existingEventTypes.length !== eventTypes.length) {
            const nonExistingEventTypes = eventTypes.filter(name => existingEventTypes.some(eventType => eventType.name === name));
            throw new Error(`The following EventTypes do not exist: ${nonExistingEventTypes.join(", ")}`);
        }

        const webhook = await this.webhookModel.create(webhookData);

        await webhook.$set('eventTypes', existingEventTypes);

        return new Webhook(webhook.id, webhook.name, webhook.url, webhook.getEventTypes());
    }
    async update(id: number, data: Partial<Webhook>): Promise<Webhook> {
        const webhook = await this.webhookModel.findByPk(id);
        if (!webhook)
            throw Error("Webhook not found")

        const {eventTypes, ...webhookData} = data;

        const existingEventTypes = await this.eventTypeModel.findAll({ where: { name: eventTypes } });

        if (existingEventTypes.length !== eventTypes.length) {
            const nonExistingEventTypes = eventTypes.filter(name => existingEventTypes.some(eventType => eventType.name === name));
            throw new Error(`The following EventTypes do not exist: ${nonExistingEventTypes.join(", ")}`);
        }

        webhook.update(webhookData);

        await webhook.save()

        webhook.$remove("eventTypes", []); // TEMP
        webhook.$set("eventTypes", existingEventTypes);
        
        return new Webhook(webhook.id, webhook.name, webhook.url, webhook.getEventTypes());
    }
    async delete(id: number): Promise<boolean> {
        const webhook = await this.webhookModel.findByPk(id);
        if (!webhook)
            throw Error("Webhook not found")
        
        await webhook.destroy();
        return true;
    }
    createMany(data: Partial<Webhook>[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
