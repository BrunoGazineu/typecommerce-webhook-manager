import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerLevel } from './config/logger-config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WebhooksSyncService } from './webhooks/webhooks.sync.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel[process.env.NODE_ENV || 'local']
  });

  const config = app.get<ConfigService>(ConfigService);

  const webhookTransportMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [config.get<string>('RABBITMQ_URL')],
      queue: 'webhook-queue',
    }
  })

  const eventsTrasnsportMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [config.get<string>('RABBITMQ_URL')],
      queue: 'events-queue',
    }
  })
  
  const webhooksSyncService = app.get(WebhooksSyncService);
  await webhooksSyncService.getWebhooks();

  await app.startAllMicroservices();
  await app.listen(config.get<string>('APP_PORT'));
}
bootstrap();
