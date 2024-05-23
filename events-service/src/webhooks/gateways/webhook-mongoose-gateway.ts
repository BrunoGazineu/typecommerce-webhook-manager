import { InjectModel } from "@nestjs/mongoose";
import { Webhook } from "../entities/webhook.entity";
import { WebhookModel } from "../models/webhook.model";
import { Model } from "mongoose";
import { IGateway } from "src/shared/gateways/gateway-interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WebhookMongooseGateway implements IGateway<Webhook> {
    constructor(
        @InjectModel(WebhookModel.name)
        private webhookModel: Model<WebhookModel>
    ) {}
    async create(webhook: Webhook): Promise<boolean> {
        const createWebhook = new this.webhookModel(webhook);
        await createWebhook.save()
        return true;
    }
    async update(webhook: Webhook): Promise<boolean> {
        const entrie = await this.webhookModel.findOneAndUpdate({id: webhook.id}, webhook, {new: true})

        if (!entrie)
            throw new Error("No webhook was found with id: " + webhook.id);

        return true;
    }
    async createMany(webhooks: Webhook[]): Promise<boolean> {
        const entries = await this.webhookModel.insertMany(webhooks);
        return true;
    }
    async findById(id: string): Promise<Webhook> {
        const webhook = await this.webhookModel.findOne({id: id});

        if (!webhook)
            throw new Error("No webhook was found with id: " + webhook.id);
        
        return this.modelToEntity(webhook);
    }
    async findAllByEventType(event_type: string): Promise<Webhook[]> {
        const webhooks = await this.webhookModel.find({event_types: { $in: [event_type] }})
        return webhooks.map(
            webhook => this.modelToEntity(webhook)
        );
    }
    async findAll(): Promise<Webhook[]> {
        const webhooks = await this.webhookModel.find();
        return webhooks.map(
            webhook => this.modelToEntity(webhook)
        )
    }
    async deleteById(id: number): Promise<boolean> {
        const result = await this.webhookModel.deleteOne({id: id});
        if (result.deletedCount === 1)
            return true

        throw new Error("No webhook was found with id: " + id);
    }

    private modelToEntity(model: WebhookModel) : Webhook {
        return new Webhook(model.id, model.name, model.url, model.event_types);
    }
}