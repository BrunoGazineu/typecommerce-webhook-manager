import { IsNotEmpty } from "class-validator"
import { IsUnique, IsValidEventTypes } from "../decorators/validation-decorators"
import { EventTypeModel } from "src/event-types/models/event-type.model"
import { WebhookModel } from "../models/webhook.model"

export class CreateWebhookDto {
    @IsUnique(WebhookModel)
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    url: string

    @IsValidEventTypes(EventTypeModel, "Webhook has invalid Event Types")
    event_types: string[]
}
