import { Webhook } from "../entities/webhook.entity";

export interface IWebhookGateway {
    create(webhook: Webhook) : Promise<boolean>;
    update(webhook: Webhook) : Promise<boolean>;
    createMany(webhooks: Webhook[]) : Promise<boolean>;
    findById(id: string) : Promise<Webhook>;
    findAllByEventType(event_type: string) : Promise<Webhook[]>;
    deleteById(id: number) : Promise<boolean>;
}