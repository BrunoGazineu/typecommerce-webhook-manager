import { Inject, Injectable, Logger } from "@nestjs/common";
import { IRepository } from "src/shared/repositories/repository-interface";
import { SeedService } from "src/shared/services/seed-service-interface";
import { Webhook } from "./entities/webhook.entity";

@Injectable()
export class WebhooksSeedService implements SeedService {
    constructor(
        @Inject("WebhookRepository")
        private readonly webhoookRepository: IRepository<Webhook>,
        private readonly logger: Logger
    ){}
    
    async seedData(): Promise<void> {
        const eventTypesCount = (await this.webhoookRepository.findAll()).length;
        if (eventTypesCount === 0) {
            this.logger.log("[Webhooks] No Webhook Data found, seeding Webhook Data")

            const webhooks: Array<Partial<Webhook>> = [
                {
                    name: "AnalyticsWebhooks",
                    url: "http://localhost:7003/analytics",
                    event_types: ["VIEW_ITEM", "VIEW_ITEM_LIST"]
                },
                {
                    name: "CartWebhooks",
                    url: "http://localhost:7003/cart",
                    event_types: ["ADD_TO_CART", "VIEW_CART", "REMOVE_FROM_CART"]
                },
                {
                    name: "CheckOutWebhooks",
                    url: "http://localhost:7003/bad",
                    event_types: ["BEGIN_CHECKOUT", "ADD_PAYMENT_INFO", "ADD_SHIPPING_INFO", "PURCHASE"]
                }
            ]

            for (let webhook of webhooks) {
                await this.webhoookRepository.create(webhook);
            }

            this.logger.log("[Webhooks] Webhooks Data Seeded")
        }
    }
    
}