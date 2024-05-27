import { Module } from '@nestjs/common';
import { EndpointsModule } from './endpoints/endpoints.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EndpointModel } from './endpoints/models/endpoint.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      entities: [EndpointModel],
      synchronize: (process.env.NODE_ENV || 'local') == 'local'
    }),
    EndpointsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
