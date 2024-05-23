import { Module } from '@nestjs/common';
import { EventsDeliveryModule } from './events-delivery/events-delivery.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DeadLetterQueueModule } from './dead-letter-queue/dead-letter-queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    EventsDeliveryModule,
    WebhooksModule,
    DeadLetterQueueModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
