import { IsEnum, IsString } from "class-validator";
import { Status } from "../entities/endpoint-status.enum";

export class CreateEndpointDto {
    @IsString()
    path: string;

    @IsEnum(Status)
    status: Status
}
