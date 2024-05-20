import { Logger } from "@nestjs/common";
import { EntityNotFoundException } from "../../shared/exceptions/entity-not-found-exceptions";

export class WebhookNotFoundException extends EntityNotFoundException {
    constructor(
        private readonly logger: Logger,
        id: number
    ) {
        super("No webhook found with id: " + id)
        this.logger.error("[Webhook] No Webhook found at id: " + id)
    }
}