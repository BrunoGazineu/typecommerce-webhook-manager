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
        this.logger.log("[Webhooks] GRPC Get All");
        const webhooks = await this.webhookHttpGateway.findAll();
        console.log(webhooks)
        this.webhookPersistentGateway.createMany(webhooks);
    }
}