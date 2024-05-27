import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { EndpointModel } from "src/endpoints/models/endpoint.model";

@Table({modelName: "webhook_log"})
export class WebhookLogModel extends Model<WebhookLogModel> {
    @ForeignKey(() => EndpointModel)
    @Column
    endpointId: number;
    
    @BelongsTo(() => EndpointModel)
    endpoint: EndpointModel

    @Column({
        type: DataType.JSON,
    })
    payload: object;
}