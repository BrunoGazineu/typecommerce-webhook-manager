"use server"

import webhookManager from "@/services/webhook-manager-service";
import { Webhook } from "@/types/webhook";
import { ActionResponse, handleRequest } from "./action-response";

export async function createWebhook(webhook: Webhook) : Promise<ActionResponse> {
    const response = await webhookManager.post({
        resource: "webhooks",
        body: webhook
    })

    return handleRequest(response, "Webhook Created");
}

export async function updateWebhook(id: number, webhook: Webhook) : Promise<ActionResponse> {
    const response = await webhookManager.patch({
        resource: "webhooks",
        id,
        body: webhook
    })


    return handleRequest(response, "Webhook Updated");
}