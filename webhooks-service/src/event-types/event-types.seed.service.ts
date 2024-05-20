import { Inject, Injectable, Logger } from "@nestjs/common";
import { IRepository } from "src/shared/repositories/repository-interface";
import { EventType } from "./entities/event-type.entity";

@Injectable()
export class EventTypeSeedService {
    constructor(
        @Inject("EventTypeRepository")
        private readonly eventTypeRepository: IRepository<EventType>,
        private readonly logger: Logger
    ) {}

    async seedData() {
        const eventTypesCount = (await this.eventTypeRepository.findAll()).length;
        if (eventTypesCount === 0) {
            this.logger.log("[EventTypes] No EventType Data found, seeding EventTypes Data")

            const success = await this.eventTypeRepository.createMany([
                { name: "VIEW_ITEM" },
                { name: "VIEW_ITEM_LIST" },
                { name: "ADD_TO_CART" },
                { name: "VIEW_CART" },
                { name: "REMOVE_FROM_CART" },
                { name: "ADD_TO_WISHLIST" },
                { name: "BEGIN_CHECKOUT" },
                { name: "ADD_PAYMENT_INFO" },
                { name: "ADD_SHIPPING_INFO" },
                { name: "PURCHASE" }
            ])

            this.logger.log("[EventTypes] EventTypes Data Seeded")
        }
    }
}