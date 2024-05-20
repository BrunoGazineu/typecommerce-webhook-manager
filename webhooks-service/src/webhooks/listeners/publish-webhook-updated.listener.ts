import { Inject, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { OnEvent } from "@nestjs/event-emitter";
import { WebhookUpdatedEvent } from "../events/webhook-updated.event";

export class PublishWebhookUpdatedListener {
    constructor(
        @Inject("WEBHOOKS_SERVICE")
        private publisher: ClientProxy,
        private readonly logger: Logger
    ){}
    
    @OnEvent('webhook.updated')
    handle(event: WebhookUpdatedEvent) {
        this.logger.log("[Webhook] Webhook updated publish event");
        this.publisher.emit('webhook-updated', event.webhook);
    }
}