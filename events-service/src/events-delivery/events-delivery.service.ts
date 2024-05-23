import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { SendEventDto } from './dto/send-event.dto';
import { DeliveryResponse, IDeliveryService } from './delivery/delivery-service-interface';
import { WebhookEvent } from './entities/webhook-event.entity';
import { ConfigService } from '@nestjs/config';
import { IGateway } from 'src/shared/gateways/gateway-interface';
import { Webhook } from 'src/webhooks/entities/webhook.entity';
import { DeadLetter } from 'src/dead-letter-queue/entities/dead-letter.entity';

@Injectable()
export class EventsDeliveryService {
    constructor(
        @Inject("IDeliveryService")
        private readonly deliveryService: IDeliveryService,
        @Inject("WebhookPersistentGateway")
        private readonly webhooksGateway: IGateway<Webhook>,
        @Inject("DeadLetterGateway")
        private readonly deadLetterGateway: IGateway<DeadLetter>,
        private readonly configService: ConfigService,
        private readonly logger: Logger
    ) {}

    async send(sendEventDto: SendEventDto) {
        this.logger.log(`[EventDelivery] Delivering ${sendEventDto.event_type} event`);
        const webhooks = await this.webhooksGateway.findAllByEventType(sendEventDto.event_type);
        if (!webhooks)
            throw new HttpException("No webhook found with event: " + sendEventDto.event_type, HttpStatus.BAD_REQUEST);
        
        const webhookEvents: WebhookEvent[] = webhooks.map(webhook => new WebhookEvent(webhook.url, sendEventDto.event_type, sendEventDto.message));
        webhookEvents.forEach(webhookEvent => this.processEventDelivery(webhookEvent));
    }

    public async processEventDelivery(webhookEvent: WebhookEvent) {
        let lastResponse: DeliveryResponse;
        for (let retries = 0; retries < this.configService.get("DELIVERY_RETRIES"); retries++) {
            lastResponse = await this.deliveryService.deliver(webhookEvent);
            if (lastResponse.success) return;
        }

        await this.deadLetterGateway.create(new DeadLetter(webhookEvent, lastResponse.error))
        console.log("Error processing Delivery")
        console.log(lastResponse)
    }
}
