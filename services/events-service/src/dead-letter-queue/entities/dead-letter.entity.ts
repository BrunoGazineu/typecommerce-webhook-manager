import { WebhookEvent } from "src/events-delivery/entities/webhook-event.entity";

export class DeadLetter {
    constructor(
        public event: WebhookEvent,
        public error: any 
    ) {}
}