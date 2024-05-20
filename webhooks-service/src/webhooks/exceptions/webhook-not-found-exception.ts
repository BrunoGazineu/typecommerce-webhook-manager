import { EntityNotFoundException } from "../../shared/exceptions/entity-not-found-exceptions";

export class WebhookNotFoundException extends EntityNotFoundException {
    constructor(id: number) {
        super("No webhook found with id: " + id)
    }
}