import { WebhookEvent } from "./webhook-event.entity";

export class DeadLetter {
    constructor(
        public id: string,
        public event: WebhookEvent,
        public created: Date,
        public error: any 
    ) {}
}