import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Status } from "../entities/endpoint-status.enum";

@Table({modelName: "endpoint"})
export class EndpointModel extends Model<EndpointModel> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    path: string;

    @Column({
        type: DataType.ENUM(...Object.values(Status)),
        defaultValue: Status.DEFAULT
    })
    status: Status;
}