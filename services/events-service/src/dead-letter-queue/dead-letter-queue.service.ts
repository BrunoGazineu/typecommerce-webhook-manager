import { Inject, Injectable } from '@nestjs/common';
import { IGateway } from 'src/shared/gateways/gateway-interface';
import { DeadLetter } from './entities/dead-letter.entity';
import { DeadLetterRetryDto } from './dto/dead-letter-retry.dto';
import { EventsDeliveryService } from 'src/events-delivery/events-delivery.service';
import { WebhookEvent } from 'src/events-delivery/entities/webhook-event.entity';

@Injectable()
export class DeadLetterQueueService {
    constructor(
        @Inject("DeadLetterGateway")
        private readonly deadLetterGateway: IGateway<DeadLetter>,
    ) {}

    async findAll() {
        return await this.deadLetterGateway.findAll(); 
    }

    async findOne(id: number) {
        return await this.deadLetterGateway.findById(id)
    }

    async remove(id: number) {
        return await this.deadLetterGateway.deleteById(id);
    }

    async retry(id: number, deadLetterRetryDto: DeadLetterRetryDto) {
        const deadLetter = await this.findOne(id);
        const webhookEvent: WebhookEvent = {...deadLetter.event, ...deadLetterRetryDto}
        await this.eventsService.processEventDelivery(webhookEvent);
        this.remove(id);
    }
}
