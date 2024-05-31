import { Endpoint } from "./endpoint";

export interface WebhookLog {
    id: number
    endpoint: Endpoint
    createdAt: string
    payload: Object
}