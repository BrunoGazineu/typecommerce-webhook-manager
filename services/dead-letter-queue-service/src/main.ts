import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerLevel } from './config/logger-config';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel[process.env.NODE_ENV]
  });

  const config = app.get<ConfigService>(ConfigService);

  const transportMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [config.get<string>('RABBITMQ_URL')], // TEMP
      queue: 'dead-letter-queue',
    }
  });

  await app.startAllMicroservices();
  await app.listen(config.get<string>('APP_PORT'));
}
bootstrap();
