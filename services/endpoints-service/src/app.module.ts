import { Module } from '@nestjs/common';
import { EndpointsModule } from './endpoints/endpoints.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EndpointModel } from './endpoints/models/endpoint.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebhookLogsModule } from './webhook-logs/webhook-logs.module';
import { WebhookLogModel } from './webhook-logs/models/webhook-log.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    SequelizeModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
        dialect: "postgres",
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        port: +config.get<number>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        models: [EndpointModel, WebhookLogModel],
        retryAttempts: 10,
        retryDelay: 1000,
        autoLoadModels: true // DEV ONLY
      }},
      inject: [ConfigService]
    }),
    EndpointsModule,
    WebhookLogsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
