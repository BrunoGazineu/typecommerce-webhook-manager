import { Inject, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { OnEvent } from "@nestjs/event-emitter";
import { WebhookDeletedEvent } from "../events/webhook-deleted.event";

export class PublishWebhookDeletedListener {
    constructor(
        @Inject("WEBHOOKS_SERVICE")
        private publisher: ClientProxy,
        private readonly logger: Logger
    ){}
    
    @OnEvent('webhook.deleted')
    handle(event: WebhookDeletedEvent) {
        this.logger.log("[Webhook] Webhook deleted publish event");
        this.publisher.emit('webhook-deleted', event.id);
    }
}