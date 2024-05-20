import { IRepository } from "src/shared/repositories/repository-interface";
import { Webhook } from "../entities/webhook.entity";
import { InjectModel } from "@nestjs/sequelize";
import { WebhookModel } from "../models/webhook.model";
import { EventTypeModel } from "src/event-types/models/event-type.model";
import { WebhookNotFoundException } from "../exceptions/webhook-not-found-exception";
import { Sequelize } from 'sequelize-typescript';

export class WebhookSequelizeRespository implements IRepository<Webhook> {
    constructor(
        @InjectModel(WebhookModel)
        private readonly webhookModel: typeof WebhookModel,
        @InjectModel(EventTypeModel)
        private readonly eventTypeModel: typeof EventTypeModel,
        private readonly sequelize: Sequelize
    ) {}

    async findAll(): Promise<Webhook[]> {
        const webhooks = await this.webhookModel.findAll({ include: EventTypeModel });
        return webhooks.map(
            (webhook) => (
                webhook.toEntity()
            )
        );
    }
    async findById(id: number): Promise<Webhook> {
        const webhook = await this.webhookModel.findByPk(id, { include: EventTypeModel });
        if (!webhook)
            throw new WebhookNotFoundException(id);

        return webhook.toEntity();
    }
    async create(data: Partial<Webhook>): Promise<Webhook> {
        const {eventTypes, ...webhookData} = data;
        const eventTypesModels = await this.eventTypeModel.findAll({ where: { name: eventTypes } });

        const webhook = await this.webhookModel.create(webhookData);

        await webhook.$set('eventTypes', eventTypesModels);

        webhook.eventTypes = await webhook.$get("eventTypes")

        return webhook.toEntity();
    }
    async update(id: number, data: Partial<Webhook>): Promise<Webhook> {
        const transaction = await this.sequelize.transaction()

        try {
            const webhook = await this.webhookModel.findByPk(id, { include: EventTypeModel });
            if (!webhook)
                throw new WebhookNotFoundException(id);

            const {eventTypes, ...webhookData} = data;
            
            const newEventTypes = await this.eventTypeModel.findAll({ where: { name: eventTypes } });
            
            const currentEventTypesId = webhook.eventTypes.map(eventType => eventType.id);
            const newEventTypesId = newEventTypes.map(eventType => eventType.id);

            const eventsTypesToRemove = currentEventTypesId.filter(id => !newEventTypesId.includes(id));
            const eventTypesToAdd = newEventTypesId.filter(id => !eventsTypesToRemove.includes(id));

            await webhook.update(webhookData, {transaction});

            await webhook.$remove("eventTypes", eventsTypesToRemove, {transaction});
            await webhook.$set("eventTypes", eventTypesToAdd, {transaction});
            webhook.eventTypes = await webhook.$get("eventTypes");

            await transaction.commit();

            return webhook.toEntity();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async delete(id: number): Promise<boolean> {
        const webhook = await this.webhookModel.findByPk(id);
        if (!webhook)
            throw new WebhookNotFoundException(id);
        
        await webhook.destroy();
        return true;
    }
    createMany(data: Partial<Webhook>[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
