import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerLevel } from './config/logger-config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

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
  await app.startAllMicroservices();
  await app.listen(7001);
}
bootstrap();
