"use server"

import webhookManager from "@/services/webhook-manager-service";
import { WebhookEvent } from "@/types/dead-letter";
import { handleRequest } from "./action-response";

export async function deadLetterRetry(id: number, webhookEvent: WebhookEvent) {
    const response = await webhookManager.post({
        resource: "dead-letter-queue",
        id,
        body: webhookEvent
    })

    return handleRequest(response, "Event Retried Succesfully") 
}

export async function deadLetterDelete(id: number) {
    const response = await webhookManager.remove({
        resource: "dead-letter-queue",
        id,
    })

    return handleRequest(response, "Event Retried Succesfully") 
}