import { Inject, Injectable } from '@nestjs/common';
import { Webhook } from './entities/webhook.entity';
import { IGateway } from 'src/shared/gateways/gateway-interface';

@Injectable()
export class WebhooksService {
    constructor(
        @Inject("WebhookPersistentGateway")
        private readonly webhookGateway: IGateway<Webhook>
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
