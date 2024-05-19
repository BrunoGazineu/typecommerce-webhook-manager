import { Module } from '@nestjs/common';
import { WebhooksModule } from './webhooks/webhooks.module';
import { EventTypesModule } from './event-types/event-types.module';

@Module({
  imports: [WebhooksModule, EventTypesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
