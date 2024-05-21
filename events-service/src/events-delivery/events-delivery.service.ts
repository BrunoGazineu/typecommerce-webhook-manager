import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SendEventDto } from './dto/send-event.dto';
import { IDeliveryService } from './delivery/delivery-service-interface';
import { IWebhookGateway } from 'src/webhooks/gateways/webhook-gateway-interface';
import { WebhookEvent } from './entities/webhook-event.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventsDeliveryService {
    constructor(
        @Inject("IDeliveryService")
        private readonly deliveryService: IDeliveryService,
        @Inject("WebhookPersistentGateway")
        private readonly webhooksGateway: IWebhookGateway,
        private readonly configService: ConfigService
    ) {}

    async send(sendEventDto: SendEventDto) {
        const webhooks = await this.webhooksGateway.findAllByEventType(sendEventDto.event_type);
        if (!webhooks)
            throw new HttpException("No webhook found with event: " + sendEventDto.event_type, HttpStatus.BAD_REQUEST);
        
        const webhookEvents: WebhookEvent[] = webhooks.map(webhook => new WebhookEvent(webhook.url, sendEventDto.event_type, sendEventDto.message));
        webhookEvents.forEach(webhookEvent => this.processEventDelivery(webhookEvent));
    }

    public async processEventDelivery(webhookEvent: WebhookEvent) {
        let lastResponse;
        for (let retries = 0; retries < this.configService.get("DELIVERY_RETRIES"); retries++) {
            lastResponse = await this.deliveryService.deliver(webhookEvent);
            if (lastResponse.success) return;
        }

        console.log("Error processing Delivery")
        console.log(lastResponse)
    }
}
