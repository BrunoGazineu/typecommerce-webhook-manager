"use server"

import webhookManager from "@/services/webhook-manager-service";
import { Endpoint } from "@/types/endpoint";
import { handleRequest } from "./action-response";

export async function updateEndpoint(id: number, endpoint: Endpoint) {
    const response = await webhookManager.patch({
        resource: "endpoints",
        id,
        body: endpoint
    })

    return handleRequest(response, "Endpoint Status Updated");
}