import { Module } from '@nestjs/common';
import { EndpointsModule } from './endpoints/endpoints.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EndpointModel } from './endpoints/models/endpoint.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { WebhooksLogModule } from './webhooks-log/webhooks-log.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    SequelizeModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        console.log(config.get<number>("DB_PORT"))
        return {
        dialect: "postgres",
        host: config.get<string>('DB_HOST'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        port: +config.get<number>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        models: [EndpointModel],
        retryAttempts: 10,
        retryDelay: 1000,
        autoLoadModels: true // DEV ONLY
      }},
      inject: [ConfigService]
    }),
    EndpointsModule,
    WebhooksLogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
