import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventTypeSeedService } from './event-types/event-types.seed.service';
import { loggerLevel } from './config/logger-config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel[process.env.NODE_ENV]
  });

  app.useGlobalPipes(new ValidationPipe());

  const eventTypeSeedService = app.get(EventTypeSeedService);
  await eventTypeSeedService.seedData();

  await app.listen(process.env.APP_PORT);
}
bootstrap();
