import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { WebhookModel } from "./webhook.model";
import { EventTypeModel } from "src/event-types/models/event-type.model";

@Table({modelName: "Webhook_EventType"})
export class WebhookEventTypeModel extends Model {
    @ForeignKey(()=>WebhookModel)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false
    })
    webhookId: number;

    @ForeignKey(() => EventTypeModel)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false
    })
    eventTypeId: number
}