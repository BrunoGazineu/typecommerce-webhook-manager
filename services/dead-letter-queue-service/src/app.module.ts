import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeadLetterQueueModule } from './dead-letter-queue/dead-letter-queue.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_CONNECTION')
      }),
      inject: [ConfigService]
    }),
    DeadLetterQueueModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
