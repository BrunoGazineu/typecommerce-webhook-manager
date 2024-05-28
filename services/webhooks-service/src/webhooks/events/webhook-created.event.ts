import { Webhook } from "../entities/webhook.entity";

export class WebhookCreatedEvent {
    constructor(
        public webhook: Webhook
    ) {}
}