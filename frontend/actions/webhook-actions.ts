"use server"

import webhookManager from "@/services/webhook-manager-service";
import { Webhook } from "@/types/webhook";

export async function createWebhook(webhook: Webhook) {
    console.log(webhook)
    return "ok"
    const response = await webhookManager.post({
        resource: "webhooks",
        body: webhook
    })
    return response;
}

export async function updateWebhook(id: number, webhook: Webhook) {
    const response = await webhookManager.patch({
        resource: "webhooks",
        id,
        body: webhook
    })
    return response;
}