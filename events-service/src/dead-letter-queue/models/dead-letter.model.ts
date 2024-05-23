import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { WebhookEvent } from "src/events-delivery/entities/webhook-event.entity";

export type DeadLetterDocument = HydratedDocument<DeadLetterModel>

@Schema()
export class DeadLetterModel {
    @Prop({ type: Object })
    event: WebhookEvent;

    @Prop({ type: Object })
    error: any;
}

export const DeadLetterSchema = SchemaFactory.createForClass(DeadLetterModel);