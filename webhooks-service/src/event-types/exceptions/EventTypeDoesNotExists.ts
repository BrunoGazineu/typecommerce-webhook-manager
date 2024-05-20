import { EntityNotFoundException } from "src/shared/exceptions/entity-not-found-exceptions";

export class EventTypeDoesNotExists extends EntityNotFoundException {
    constructor(eventTypesNames: string[]) {
        super("The following eventTypes do not exist " + eventTypesNames.join(", "))
    }   
}