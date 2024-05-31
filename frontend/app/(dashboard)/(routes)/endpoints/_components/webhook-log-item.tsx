"use client"

import { JsonEditor } from "@/components/json-editor";
import { WebhookLog } from "@/types/webhook-log";

export function WebhookLogItem({
    webhookLog
}: {
    webhookLog: WebhookLog
}) {
    return (
        <div className="grid px-2 items-center xl:grid-cols-2 gap-x-2 py-2 cursor-pointer bg-sky-100 border-sky-200 text-sky-700 border rounded-md mb-4 text-sm">
            <div className="pb-1">
                Endpoint: {webhookLog.endpoint?.path}
            </div>
            <div className="pb-1">
                Created: {new Date(webhookLog.createdAt).toLocaleDateString("pt-BR", {hour: "2-digit", minute: "2-digit", second: "2-digit"})}
            </div>
            <div className="col-span-2">
                <JsonEditor editable={false} initialData={webhookLog.payload} />
            </div>
        </div>
    )
}