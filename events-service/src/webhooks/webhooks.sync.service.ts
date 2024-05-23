import { Inject, Injectable, Logger } from "@nestjs/common";
import { IGateway } from "src/shared/gateways/gateway-interface";
import { Webhook } from "./entities/webhook.entity";
@Injectable()
export class WebhooksSyncService {
    constructor(
        @Inject("WebhookHttpGateway")
        private readonly webhookHttpGateway: IGateway<Webhook>,
        @Inject("WebhookPersistentGateway")
        private readonly webhookPersistentGateway: IGateway<Webhook>,
        private readonly logger: Logger
    ) {}

    async getWebhooks() {
        const count = (await this.webhookPersistentGateway.findAll()).length
        if (count === 0) {
            this.logger.log("[Webhooks] No Webhook found, getting webhooks using GRPC");
            const webhooks = await this.webhookHttpGateway.findAll();
            await this.webhookPersistentGateway.createMany(webhooks);
            this.logger.log("[Webhooks] Webhooks retrieved")
        }
    }
}