import { Inject, Injectable, Logger } from '@nestjs/common';
import { RetryDeadLetterDto } from './dto/retry-dead-letter.dto';
import { IGateway } from './gateways/gateway-interface';
import { DeadLetter } from './entities/dead-letter.entity';

@Injectable()
export class DeadLetterQueueService {
  constructor(
    @Inject("DeadLetterGateway")
    private readonly deadLetterGateway: IGateway<DeadLetter>,
    private readonly logger: Logger
  ) {}

  findAll() {
    this.logger.log("[Dead Letter] Find All");
    return this.deadLetterGateway.findAll();
  }

  findOne(id: number) {
    this.logger.log("[Dead Letter] Find One");
    return this.deadLetterGateway.findById(id);
  }

  remove(id: number) {
    this.logger.log("[Dead Letter] Remove")
    return this.deadLetterGateway.deleteById(id);
  }

  retry(id: number, retryDeadLetterDto: RetryDeadLetterDto) {
    this.logger.log("[Dead Letter] Retry")
  }
}
