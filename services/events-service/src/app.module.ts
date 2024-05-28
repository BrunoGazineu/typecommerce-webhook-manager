import { Module } from '@nestjs/common';
import { EventsDeliveryModule } from './events-delivery/events-delivery.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_CONNECTION')
      }),
      inject: [ConfigService]
    }
    ),
    EventsDeliveryModule,
    WebhooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
