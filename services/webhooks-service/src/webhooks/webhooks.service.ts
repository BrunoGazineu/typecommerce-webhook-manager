import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Webhook } from './entities/webhook.entity';
import { IRepository } from 'src/shared/repositories/repository-interface';
import EventEmitter from 'events';
import { WebhookCreatedEvent } from './events/webhook-created.event';
import { WebhookUpdatedEvent } from './events/webhook-updated.event';
import { WebhookDeletedEvent } from './events/webhook-deleted.event';
import { EventType } from 'src/event-types/entities/event-type.entity';
import { validate } from 'class-validator';

@Injectable()
export class WebhooksService {
  constructor(
    @Inject("WebhookRepository")
    private readonly webhookRepository: IRepository<Webhook>,
    @Inject("EventTypeRepository")
    private readonly eventTypeRepository: IRepository<EventType>,
    @Inject("EventEmitter")
    private readonly eventEmitter: EventEmitter
  ) {}
  
  async create(createWebhookDto: CreateWebhookDto) {
    await this.validateDto(createWebhookDto)
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
    await this.validateDto(updateWebhookDto);
    const webhook = await this.webhookRepository.update(id, updateWebhookDto);
    this.eventEmitter.emit('webhook.updated', new WebhookUpdatedEvent(webhook));
    return webhook;
  }

  async remove(id: number) {
    await this.webhookRepository.delete(id);
    this.eventEmitter.emit('webhook.deleted', new WebhookDeletedEvent(id));
    return true;
  }

  private async validateDto(dto: Partial<CreateWebhookDto>) {
    const messages: string[] = []
    const existingEventTypes = await this.eventTypeRepository.findAll({name: dto.event_types})
    if (existingEventTypes.length === 0) {
      const validEventTypes = existingEventTypes.map(eventType => eventType.name)
      const difference = dto.event_types.filter((element) => !validEventTypes.includes(element));
      messages.push("Payload has the following invalid event_types: " + difference.join(", "))
    }

    const count = await this.webhookRepository.count({name: dto.name})
    if (count > 0) 
      messages.push("Webhook name must be unique");
    
    if (messages.length > 0)
      throw new HttpException({message: messages, statusCode: 400}, 400)
  }
}
