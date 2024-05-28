import { WebhookEvent } from "./webhook-event.entity";

export class DeadLetter {
    constructor(
        public event: WebhookEvent,
        public error: any 
    ) {}
}