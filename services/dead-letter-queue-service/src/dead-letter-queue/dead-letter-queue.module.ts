import { Logger, Module } from '@nestjs/common';
import { DeadLetterQueueService } from './dead-letter-queue.service';
import { DeadLetterQueueController } from './dead-letter-queue.controller';
import { DeadLetterMongooseGateway } from './gateways/dead-letter-mongoose-gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { DeadLetterModel, DeadLetterSchema } from './models/dead-letter.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{name: DeadLetterModel.name, schema: DeadLetterSchema}]),
    ClientsModule.registerAsync([
      {
        name: 'EVENTS_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>("RABBITMQ_URL")],
            queue: 'events-queue',
          }
        })
      }
    ]),
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
