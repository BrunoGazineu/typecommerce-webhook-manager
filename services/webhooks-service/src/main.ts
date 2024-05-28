import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventTypeSeedService } from './event-types/event-types.seed.service';
import { loggerLevel } from './config/logger-config';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WebhooksSeedService } from './webhooks/webhooks.seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel[process.env.NODE_ENV]
  });
  app.useGlobalPipes(new ValidationPipe());

  const grpcMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: "webhooks",
      protoPath: join(__dirname, 'webhooks/protos/webhooks.proto'),
      url: 'localhost:50001'
    }
  })

  const eventTypeSeedService = app.get(EventTypeSeedService);
  await eventTypeSeedService.seedData();

  const webhooksSeedService = app.get(WebhooksSeedService);
  webhooksSeedService.seedData();

  await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
