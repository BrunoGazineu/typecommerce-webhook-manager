import { Attributes, IRepository } from "src/shared/repositories/repository-interface";
import { Webhook } from "../entities/webhook.entity";
import { InjectModel } from "@nestjs/sequelize";
import { WebhookModel } from "../models/webhook.model";
import { EventTypeModel } from "src/event-types/models/event-type.model";
import { WebhookNotFoundException } from "../exceptions/webhook-not-found-exception";
import { Sequelize } from 'sequelize-typescript';
import { Logger } from "@nestjs/common";

export class WebhookSequelizeRespository implements IRepository<Webhook> {
    constructor(
        @InjectModel(WebhookModel)
        private readonly webhookModel: typeof WebhookModel,
        @InjectModel(EventTypeModel)
        private readonly eventTypeModel: typeof EventTypeModel,
        private readonly sequelize: Sequelize,
        private readonly logger: Logger
    ) {}

    async count(where: Attributes = {}): Promise<number> {
        return this.eventTypeModel.count(where)
    }

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
            throw new WebhookNotFoundException(this.logger, id);

        return webhook.toEntity();
    }
    async create(data: Partial<Webhook>): Promise<Webhook> {
        const {event_types, ...webhookData} = data;

        const eventTypesModels = await this.eventTypeModel.findAll({ where: { name: event_types } });

        const webhook = await this.webhookModel.create(webhookData);

        await webhook.$set('event_types', eventTypesModels);

        webhook.event_types = await webhook.$get("event_types")

        return webhook.toEntity();
    }
    async update(id: number, data: Partial<Webhook>): Promise<Webhook> {
        const transaction = await this.sequelize.transaction()

        try {
            const webhook = await this.webhookModel.findByPk(id, { include: EventTypeModel });
            if (!webhook)
                throw new WebhookNotFoundException(this.logger, id);

            const {event_types, ...webhookData} = data;
            
            const newEventTypes = await this.eventTypeModel.findAll({ where: { name: event_types } });
            
            const currentEventTypesId = webhook.event_types.map(eventType => eventType.id);
            const newEventTypesId = newEventTypes.map(eventType => eventType.id);

            const eventsTypesToRemove = currentEventTypesId.filter(id => !newEventTypesId.includes(id));
            const eventTypesToAdd = newEventTypesId.filter(id => !eventsTypesToRemove.includes(id));

            await webhook.update(webhookData, {transaction});

            await webhook.$remove("event_types", eventsTypesToRemove, {transaction});
            await webhook.$set("event_types", eventTypesToAdd, {transaction});
            webhook.event_types = await webhook.$get("event_types", {transaction});

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
            throw new WebhookNotFoundException(this.logger, id);
        
        await webhook.destroy();
        return true;
    }
    createMany(data: Partial<Webhook>[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
