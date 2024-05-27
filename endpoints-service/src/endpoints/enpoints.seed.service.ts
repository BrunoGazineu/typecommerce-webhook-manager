import { Inject, Injectable, Logger } from "@nestjs/common";
import { Endpoint } from "./entities/endpoint.entity";
import { InjectModel } from "@nestjs/sequelize";
import { EndpointModel } from "./models/endpoint.model";
import { Status } from "./entities/endpoint-status.enum";

@Injectable()
export class EndpointSeedService{
    constructor(
        @InjectModel(EndpointModel)
        private readonly endpointModel: typeof EndpointModel,
    ){}
    
    async seedData(): Promise<void> {
        const endpointsCount = (await this.endpointModel.findAll()).length;
        if (endpointsCount === 0) {
            const endpoints: Array<Partial<{path: string, status: Status}>> = [
                {
                    path: "/cart",
                    status: Status.DEFAULT
                },
                {
                    path: "/analytics",
                    status: Status.DEFAULT
                },
                {
                    path: "/bad",
                    status: Status.BADGATEWAY
                },
                {
                    path: "/timeout",
                    status: Status.TIMEOUT
                }
            ]

            for (let endpoint of endpoints) {
                await this.endpointModel.create(endpoint);
            }

        }
    }
    
}