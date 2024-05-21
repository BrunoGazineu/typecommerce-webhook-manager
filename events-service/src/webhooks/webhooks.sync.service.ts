import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientGrpc, ClientProxy } from "@nestjs/microservices";
import { IWebhookGateway } from "./gateways/webhook-gateway-interface";
@Injectable()
export class WebhooksSyncService {
    constructor(
        @Inject("WebhookHttpGateway")
        private readonly webhookHttpGateway: IWebhookGateway,
        @Inject("WebhookPersistentGateway")
        private readonly webhookPersistentGateway: IWebhookGateway,
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