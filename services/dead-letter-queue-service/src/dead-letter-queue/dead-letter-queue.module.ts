import { Logger, Module } from '@nestjs/common';
import { DeadLetterQueueService } from './dead-letter-queue.service';
import { DeadLetterQueueController } from './dead-letter-queue.controller';
import { DeadLetterMongooseGateway } from './gateways/dead-letter-mongoose-gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { DeadLetterModel, DeadLetterSchema } from './models/dead-letter.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: DeadLetterModel.name, schema: DeadLetterSchema}]),
  ],
  controllers: [DeadLetterQueueController],
  providers: [
    Logger,
    DeadLetterQueueService,
    DeadLetterMongooseGateway,
    {
      provide: "DeadLetterGateway",
      useExisting: DeadLetterMongooseGateway
    }
  ],
})
export class DeadLetterQueueModule {}
