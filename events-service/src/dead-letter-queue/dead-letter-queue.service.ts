import { Inject, Injectable } from '@nestjs/common';
import { IGateway } from 'src/shared/gateways/gateway-interface';
import { DeadLetter } from './entities/dead-letter.entity';

@Injectable()
export class DeadLetterQueueService {
    constructor(
        @Inject("DeadLetterGateway")
        private readonly deadLetterGateway: IGateway<DeadLetter>
    ) {}

    async findAll() {
        return await this.deadLetterGateway.findAll(); 
    }
}
