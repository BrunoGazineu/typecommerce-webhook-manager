import { InjectModel } from "@nestjs/mongoose";
import { Webhook } from "../entities/webhook.entity";
import { IWebhookGateway } from "./webhook-gateway-interface";
import { WebhookModel } from "../models/webhook.model";
import { Model } from "mongoose";

export class WebhookMongooseGateway implements IWebhookGateway {
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
        
        return webhook.toEntity()
    }
    async findAllByEventType(event_type: string): Promise<Webhook[]> {
        const webhooks = await this.webhookModel.find({event_types: { $in: [event_type] }})
        return webhooks.map(
            webhook => webhook.toEntity()
        );
    }
    async deleteById(id: number): Promise<boolean> {
        const result = await this.webhookModel.deleteOne({id: id});
        if (result.deletedCount === 1)
            return true

        throw new Error("No webhook was found with id: " + id);
    }
}