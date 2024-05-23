import { Module } from '@nestjs/common';
import { DeadLetterQueueService } from './dead-letter-queue.service';
import { DeadLetterQueueController } from './dead-letter-queue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeadLetterModel, DeadLetterSchema } from './models/dead-letter.model';
import { DeadLetterMongooseGateway } from './gateways/dead-letter-mongoose-gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{name: DeadLetterModel.name, schema: DeadLetterSchema}]),
  ],
  controllers: [DeadLetterQueueController],
  providers: [
    DeadLetterQueueService,
    DeadLetterMongooseGateway,
    {
      provide: "DeadLetterGateway",
      useExisting: DeadLetterMongooseGateway
    }
  ],
})
export class DeadLetterQueueModule {}
