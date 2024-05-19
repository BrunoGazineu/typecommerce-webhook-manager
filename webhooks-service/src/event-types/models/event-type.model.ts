import { Model, Column, Table, DataType, BelongsToMany } from "sequelize-typescript";
import { Webhook } from "src/webhooks/entities/webhook.entity";
import { WebhookEventTypeModel } from "src/webhooks/models/webhook-event-type.model";
import { WebhookModel } from "src/webhooks/models/webhook.model";

@Table({modelName: "EventTypes"})
export class EventTypeModel extends Model<EventTypeModel> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    name: string;

    @BelongsToMany(() => WebhookModel, () => WebhookEventTypeModel)
    webhooks?: Webhook[];
} 