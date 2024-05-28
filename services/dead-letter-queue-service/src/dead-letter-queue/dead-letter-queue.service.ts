import { Inject, Injectable, Logger } from '@nestjs/common';
import { RetryDeadLetterDto } from './dto/retry-dead-letter.dto';
import { IGateway } from './gateways/gateway-interface';
import { DeadLetter } from './entities/dead-letter.entity';
import { IPublisher } from 'src/shared/publishers/publisher-interface';
import { WebhookEvent } from './entities/webhook-event.entity';

@Injectable()
export class DeadLetterQueueService {
  constructor(
    @Inject("DeadLetterGateway")
    private readonly deadLetterGateway: IGateway<DeadLetter>,
    @Inject("EVENTS_SERVICE")
    private readonly eventsPublisher: IPublisher,
    private readonly logger: Logger
  ) {}

  async create(deadLetter: DeadLetter) {
    this.logger.log("[Dead Letter] Create")
    return this.deadLetterGateway.create(deadLetter)
  }

  async findAll() {
    this.logger.log("[Dead Letter] Find All");
    return this.deadLetterGateway.findAll();
  }

  async findOne(id: string) {
    this.logger.log("[Dead Letter] Find One");
    return this.deadLetterGateway.findById(id);
  }

  async remove(id: string) {
    this.logger.log("[Dead Letter] Remove")
    return this.deadLetterGateway.deleteById(id);
  }

  async retry(id: string, retryDeadLetterDto: RetryDeadLetterDto) {
    this.logger.log("[Dead Letter] Retry")

    const deadLetter = await this.deadLetterGateway.findById(id);
    const webhookEvent: WebhookEvent = {...deadLetter.event, ...retryDeadLetterDto};

    this.eventsPublisher.emit("retry-event", webhookEvent);

    await this.remove(id);
  }
}
