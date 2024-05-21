import { Module } from '@nestjs/common';
import { EventsDeliveryModule } from './events-delivery/events-delivery.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    EventsDeliveryModule,
    WebhooksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
