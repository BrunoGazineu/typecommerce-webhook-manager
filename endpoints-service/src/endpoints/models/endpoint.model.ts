import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../entities/endpoint-status.enum";

Entity()
export class EndpointModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "string",
        unique: true
    })
    path: string;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.DEFAULT
    })
    status: Status;
}