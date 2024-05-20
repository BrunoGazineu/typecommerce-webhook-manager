import { Inject, Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Webhook } from './entities/webhook.entity';
import { IRepository } from 'src/shared/repositories/repository-interface';
import EventEmitter from 'events';
import { WebhookCreatedEvent } from './events/webhook-created.event';
import { WebhookUpdatedEvent } from './events/webhook-updated.event';
import { WebhookDeletedEvent } from './events/webhook-deleted.event';

@Injectable()
export class WebhooksService {
  constructor(
    @Inject("WebhookRepository")
    private readonly webhookRepository: IRepository<Webhook>,
    @Inject("EventEmitter")
    private readonly eventEmitter: EventEmitter
  ) {}
  
  async create(createWebhookDto: CreateWebhookDto) {
    const webhook = await this.webhookRepository.create(createWebhookDto);
    this.eventEmitter.emit('webhook.created', new WebhookCreatedEvent(webhook));
    return webhook;
  }

  async findAll() {
    return await this.webhookRepository.findAll();
  }

  async findOne(id: number) {
    return await this.webhookRepository.findById(id);
  }

  async update(id: number, updateWebhookDto: UpdateWebhookDto) {
    const webhook = await this.webhookRepository.update(id, updateWebhookDto);
    this.eventEmitter.emit('webhook.updated', new WebhookUpdatedEvent(webhook));
    return webhook;
  }

  async remove(id: number) {
    await this.webhookRepository.delete(id);
    this.eventEmitter.emit('webhook.deleted', new WebhookDeletedEvent(id));
    return true;
  }
}
