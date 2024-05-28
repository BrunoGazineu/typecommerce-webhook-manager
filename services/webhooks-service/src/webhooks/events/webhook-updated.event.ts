import { Webhook } from "../entities/webhook.entity";

export class WebhookUpdatedEvent {
    constructor(
        public webhook: Webhook
    ) {}
}