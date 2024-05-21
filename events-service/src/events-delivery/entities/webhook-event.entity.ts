export class WebhookEvent {
    constructor(
        public url: string,
        public method: string,
        public message: any
    ) {}
}