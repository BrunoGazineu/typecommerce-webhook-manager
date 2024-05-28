import { DeadLetter } from "../entities/dead-letter.entity";

export class DeliveryErrorEvent {
    constructor(
        public deadLetter: DeadLetter
    ) {}
}