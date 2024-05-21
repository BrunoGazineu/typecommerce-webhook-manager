import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Webhook } from "../entities/webhook.entity";

export type WebhookDocument = HydratedDocument<WebhookModel>

@Schema()
export class WebhookModel {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    url: string;

    @Prop([String])
    event_types: string[]
}

export const WebhookSchema = SchemaFactory.createForClass(WebhookModel);