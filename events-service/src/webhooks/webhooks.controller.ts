import { Controller, Logger } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Webhook } from './entities/webhook.entity';

@Controller()
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksService,
    private readonly logger: Logger
  ) {}

  @EventPattern("webhook-created")
  handleWebhookCreated(@Payload() webhook: Webhook) {
    this.logger.log("[Webhook] Consuming webhook-created event")
    return this.webhooksService.create(webhook);
  }

  @EventPattern("webhook-updated")
  handleWebhookUpdated(@Payload() webhook: Webhook) {
    this.logger.log("[Webhook] Consuming webhook-created event")
    return this.webhooksService.update(webhook);
  }

  @EventPattern("webhook-deleted")
  handleWebhookDeleted(@Payload() id: number) {
    this.logger.log("[Webhook] Consuming webhook-deleted event")
    return this.webhooksService.delete(id);
  }
}
