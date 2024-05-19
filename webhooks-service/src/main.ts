import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EventTypeSeedService } from './event-types/event-types.seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const eventTypeSeedService = app.get(EventTypeSeedService);
  await eventTypeSeedService.seedData();

  await app.listen(process.env.APP_PORT);
}
bootstrap();
