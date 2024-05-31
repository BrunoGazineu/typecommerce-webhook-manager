import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateWebhookDto {
    @IsNotEmpty()
    url: string

    @IsDefined()
    // @IsValidEventTypes(EventTypeModel, "Webhook has invalid Event Types")
    event_types: string[]
}
