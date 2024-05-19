import { Inject, Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Webhook } from './entities/webhook.entity';
import { IRepository } from 'src/shared/repositories/repository-interface';

@Injectable()
export class WebhooksService {
  constructor(
    @Inject("WebhookRepository")
    private readonly webhookRepository: IRepository<Webhook>
  ) {}
  
  async create(createWebhookDto: CreateWebhookDto) {
    const webhook = await this.webhookRepository.create(createWebhookDto);
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
    return webhook;
  }

  async remove(id: number) {
    return this.webhookRepository.delete(id);
  }
}
