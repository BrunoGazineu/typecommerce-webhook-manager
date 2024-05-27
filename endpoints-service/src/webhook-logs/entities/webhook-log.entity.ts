import { Endpoint } from "src/endpoints/entities/endpoint.entity";

export class WebhookLog {
    endpoint: Endpoint
    payload: any
}
