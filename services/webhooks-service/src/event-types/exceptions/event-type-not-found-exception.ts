import { EntityNotFoundException } from "src/shared/exceptions/entity-not-found-exceptions";

export class EventTypeNotFoundException extends EntityNotFoundException {
    constructor(
        id: number
    ) {
        super("No eventType found with id: " + id)
    }   
}