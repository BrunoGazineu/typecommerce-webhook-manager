import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerLevel } from './config/logger-config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WebhooksSyncService } from './webhooks/webhooks.sync.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel[process.env.NODE_ENV]
  });
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://guest:guest@localhost:5672"], // TEMP
      queue: 'webhook-queue',
    }
  })
  
  const webhooksSyncService = app.get(WebhooksSyncService);
  await webhooksSyncService.getWebhooks();

  await app.startAllMicroservices();
  await app.listen(7001);
}
bootstrap();
