import { PartialType } from '@nestjs/mapped-types';
import { CreateWebhookDto } from './create-webhook.dto';
import { IsValidEventTypes } from '../decorators/validation-decorators';
import { EventTypeModel } from 'src/event-types/models/event-type.model';
import { IsArray, IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateWebhookDto {
    @IsNotEmpty()
    url: string

    @IsDefined()
    @IsValidEventTypes(EventTypeModel)
    event_types: string[]
}
