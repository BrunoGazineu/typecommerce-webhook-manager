import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [EventsModule, WebhooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
