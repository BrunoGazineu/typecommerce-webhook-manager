"use server"

import webhookManager from "@/services/webhook-manager-service"
import { SendEvent } from "@/types/send-event"
import { ActionResponse, handleRequest } from "./action-response";

export async function sendEvent(event: SendEvent) : Promise<ActionResponse> {
    const response = await webhookManager.post({
        resource: "events-delivery",
        body: event
    });

    return handleRequest(response, "Processing Event Delivery")
}