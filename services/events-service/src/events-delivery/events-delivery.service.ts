import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { SendEventDto } from './dto/send-event.dto';
import { DeliveryResponse, IDeliveryService } from './delivery/delivery-service-interface';
import { WebhookEvent } from './entities/webhook-event.entity';
import { ConfigService } from '@nestjs/config';
import { IGateway } from 'src/shared/gateways/gateway-interface';
import { Webhook } from 'src/webhooks/entities/webhook.entity';
import { IPublisher } from 'src/shared/publishers/publisher-interface';
import { DeadLetter } from './entities/dead-letter.entity';
import { EventEmitter } from 'stream';
import { DeliveryErrorEvent } from './events/delivery-error.event';

@Injectable()
export class EventsDeliveryService {
    constructor(
        @Inject("IDeliveryService")
        private readonly deliveryService: IDeliveryService,
        @Inject("WebhookPersistentGateway")
        private readonly webhooksGateway: IGateway<Webhook>,
        @Inject("EventEmitter")
        private readonly eventEmitter: EventEmitter,
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
        const retriesAttempts = +this.configService.get("DELIVERY_RETRIES");
        const timeout = +this.configService.get("TIMEOUT");
        const response: DeliveryResponse = await this.deliveryService.deliver(webhookEvent, retriesAttempts, timeout);

        if (response.success) {
            this.logger.log("[EventDelivery] Succesfully delivered to " + webhookEvent.url)
            return
        }

        const deadLetter = new DeadLetter(webhookEvent, response.error);

        this.eventEmitter.emit('delivery.error', new DeliveryErrorEvent(deadLetter))

    }
}
