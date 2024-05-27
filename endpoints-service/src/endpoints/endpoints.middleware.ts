import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from 'express';
import { EndpointModel } from "./models/endpoint.model";
import { InjectModel } from "@nestjs/sequelize";
import { Status } from "./entities/endpoint-status.enum";
import { Endpoint } from "./entities/endpoint.entity";

@Injectable()
export class EndpointMiddleware implements NestMiddleware {
    constructor(
        @InjectModel(EndpointModel)
        private readonly endpointModel: typeof EndpointModel
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (req.method !== "POST") return res.status(404).send("Method not valid");

        const url = req.originalUrl;
        console.log(url)
        const endpoint = await this.endpointModel.findOne({where: {path: url}})

        if (!endpoint)
            return res.status(404).send("Endpoint not found");

        switch(endpoint.status) {
            case Status.BADGATEWAY: return res.status(400).send({error: "Custom Bad Gateway"});
            case Status.INTERNAL_ERROR: throw new Error("Custom internal Error");
            case Status.TIMEOUT: await new Promise(resolve => setTimeout(resolve, 500_000)); return;
            case Status.DEFAULT: return this.handleDefaultRequest(req, res, endpoint)
        }
    }

    private handleDefaultRequest(req: Request, res: Response, endpoint: Endpoint) {
        return res.status(200).send(req.body);
    }
}