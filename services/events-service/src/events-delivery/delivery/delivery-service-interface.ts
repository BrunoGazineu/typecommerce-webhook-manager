import { WebhookEvent } from "../entities/webhook-event.entity";

export interface DeliveryResponse {
    success: boolean;
    error?: any 
}

export interface IDeliveryService {
    deliver(webhookEvent: WebhookEvent, retries: number, timeout?: number) : Promise<DeliveryResponse>;
} 