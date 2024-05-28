import { Inject, Logger } from "@nestjs/common";
import { WebhookCreatedEvent } from "../events/webhook-created.event";
import { ClientProxy } from "@nestjs/microservices";
import { OnEvent } from "@nestjs/event-emitter";
import { IPublisher } from "src/shared/publishers/publisher-interface";

export class PublishWebhookCreatedListener {
    constructor(
        @Inject("WEBHOOKS_SERVICE")
        private publisher: IPublisher,
        private readonly logger: Logger
    ){}
    
    @OnEvent('webhook.created')
    handle(event: WebhookCreatedEvent) {
        this.logger.log("[Webhook] Webhook created publish event");
        this.publisher.emit('webhook-created', event.webhook);
    }
}