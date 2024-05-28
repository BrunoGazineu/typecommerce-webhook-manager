import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerLevel } from './config/logger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: loggerLevel[process.env.NODE_ENV]});
  await app.listen(3000);
}
bootstrap();
