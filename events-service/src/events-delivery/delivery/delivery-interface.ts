import { WebhookEvent } from "../entities/webhook-event.entity";

export interface DeliveryResponse {
    success: boolean;
    error?: any 
}

export interface IDelivery {
    deliver(webhookEvent: WebhookEvent) : Promise<DeliveryResponse>;
} 