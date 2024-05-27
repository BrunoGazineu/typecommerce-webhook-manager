import { WebhookLog } from "src/webhook-logs/entities/webhook-log.entity"
import { Status } from "./endpoint-status.enum"

export class Endpoint {
    id?: number
    path: string
    status: Status
    webhookLogs: WebhookLog[]
}
