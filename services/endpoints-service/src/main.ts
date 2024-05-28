import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EndpointSeedService } from './endpoints/enpoints.seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const webhooksSeedService = app.get(EndpointSeedService);
  webhooksSeedService.seedData();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
