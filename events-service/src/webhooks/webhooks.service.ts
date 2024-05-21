import { Inject, Injectable } from '@nestjs/common';
import { Webhook } from './entities/webhook.entity';
import { IWebhookGateway } from './gateways/webhook-gateway-interface';

@Injectable()
export class WebhooksService {
    constructor(
        @Inject("WebhookPersistentGateway")
        private readonly webhookGateway: IWebhookGateway
    ) {}
    
    async create(webhook: Webhook) {
        await this.webhookGateway.create(webhook);
    }

    async update(webhook: Webhook) {
        await this.webhookGateway.update(webhook);
    }

    async delete(id: number) {
        await this.webhookGateway.deleteById(id);
    }
}
