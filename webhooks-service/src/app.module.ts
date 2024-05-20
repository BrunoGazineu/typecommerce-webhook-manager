import { Module } from '@nestjs/common';
import { WebhooksModule } from './webhooks/webhooks.module';
import { EventTypesModule } from './event-types/event-types.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebhookModel } from './webhooks/models/webhook.model';
import { EventTypeModel } from './event-types/models/event-type.model';
import { WebhookEventTypeModel } from './webhooks/models/webhook-event-type.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      models: [WebhookModel, EventTypeModel, WebhookEventTypeModel],
      autoLoadModels: true // DEV ONLY
    }),
    WebhooksModule,
    EventTypesModule
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
