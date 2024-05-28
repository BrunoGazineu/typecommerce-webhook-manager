import { Inject, Logger } from "@nestjs/common";
import { IPublisher } from "src/shared/publishers/publisher-interface";
import { OnEvent } from "@nestjs/event-emitter";
import { DeliveryErrorEvent } from "../events/delivery-error.event";

export class PublishDeliveryErrorToDeadLetterQueueListener {
    constructor(
        @Inject("DEAD_LETTER_SERVICE")
        private publisher: IPublisher,
        private readonly logger: Logger
    ){} 
        
    @OnEvent('delivery.error')
    handle(event: DeliveryErrorEvent) {
        this.logger.log("[Event Delivery] Delivery Error publish event");
        this.publisher.emit('create-dead-letter', event.deadLetter);
    }
}