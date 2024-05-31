import { WebhookEvent } from "../entities/webhook-event.entity";
import { DeliveryResponse, IDeliveryService } from "./delivery-service-interface";

export class InMemoryDeliveryService implements IDeliveryService {
    returnError: boolean
    deliveries: WebhookEvent[] = []

    constructor() {
        this.returnError = false;
        this.deliveries = []
    }

    async deliver(webhookEvent: WebhookEvent, retries: number, timeout?: number): Promise<DeliveryResponse> {
        this.deliveries.push(webhookEvent);
        if (this.returnError)
            return {success: false, error: "Error"}

        return {success: true}
    }
}