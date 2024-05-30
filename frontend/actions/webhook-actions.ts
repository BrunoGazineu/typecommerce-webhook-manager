"use server"

import webhookManager from "@/services/webhook-manager-service";
import { Webhook } from "@/types/webhook";
import { ActionResponse } from "./action-response";
import { AxiosError } from "axios";

export async function createWebhook(webhook: Webhook) : Promise<ActionResponse> {
    const response = await webhookManager.post({
        resource: "webhooks",
        body: webhook
    })

    if (response.success)
        return {result: "success", message: "Webhook Created"}

    return {result: "error", message: response.data.response.data.message[0]};
}

export async function updateWebhook(id: number, webhook: Webhook) : Promise<ActionResponse> {
    const response = await webhookManager.patch({
        resource: "webhooks",
        id,
        body: webhook
    })
    if (response.success)
        return {result: "success", message: "Webhook Updated"}

    return {result: "error", message: "Could not update webhook"};
}