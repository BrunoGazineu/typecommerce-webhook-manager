import { Model, Column, Table, DataType, BelongsToMany } from "sequelize-typescript";
import { WebhookEventTypeModel } from "./webhook-event-type.model";
import { EventTypeModel } from "src/event-types/models/event-type.model";

@Table({modelName: "Webhooks"})
export class WebhookModel extends Model<WebhookModel> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    url: string;

    @BelongsToMany(() => EventTypeModel, () => WebhookEventTypeModel)
    eventTypes?: EventTypeModel[]


    public getEventTypes() : string[] {
        return this.eventTypes.map(
            (evenType)=>evenType.name
        );
    }
}