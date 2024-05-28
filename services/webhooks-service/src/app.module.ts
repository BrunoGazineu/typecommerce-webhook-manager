import { Module } from '@nestjs/common';
import { WebhooksModule } from './webhooks/webhooks.module';
import { EventTypesModule } from './event-types/event-types.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebhookModel } from './webhooks/models/webhook.model';
import { EventTypeModel } from './event-types/models/event-type.model';
import { WebhookEventTypeModel } from './webhooks/models/webhook-event-type.model';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    EventEmitterModule.forRoot(),
    SequelizeModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        dialect: "postgres",
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        port: +config.get<string>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        models: [WebhookModel, EventTypeModel, WebhookEventTypeModel],
        retryAttempts: 10,
        retryDelay: 1000,
        autoLoadModels: true // DEV ONLY
      }),
      inject: [ConfigService]
    }),
    WebhooksModule,
    EventTypesModule
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
