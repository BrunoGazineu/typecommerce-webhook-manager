"use server"

import webhookManager from "@/services/webhook-manager-service"
import { WebhookEvent } from "@/types/webhook-event"
import { ActionResponse } from "./action-response";

export async function sendEvent(event: WebhookEvent) : Promise<ActionResponse> {
    const response = await webhookManager.post({
        resource: "events-delivery",
        body: event
    });

    if (response.success) return { result: "success", message: "Processing Event Delivery" }
    return { result: "error", message: response.data?.response?.data?.message[0] || "Unexpected error" }
}