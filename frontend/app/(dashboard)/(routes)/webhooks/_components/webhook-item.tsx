import { Webhook } from "@/types/webhook"
import { Edit } from "lucide-react"

export interface WebhookItemProps {
    webhook: Webhook,
    editWebhook: (webhook: Webhook) => void
}

export function WebhookItem ({
    webhook,
    editWebhook
}: WebhookItemProps) {
    return (
        <div onClick={()=>editWebhook(webhook)} className="grid items-center xl:grid-cols-2 gap-x-2 py-2 cursor-pointer bg-sky-100 border-sky-200 text-sky-700 border rounded-md mb-4 text-sm">
            <div className="flex items-center col-span-1 px-2 border-r border-sky-600">
                <div className="border-r pr-2 mr-2 border-sky-600">
                    <Edit />
                </div>
                {webhook.name}
            </div>
            <div className="col-span-1 px-2">
                {webhook.url}
            </div>
            <div className="mt-2 col-span-2 px-2 whitespace-nowrap text-ellipsis">
                {webhook.event_types.join(', ')}
            </div>
        </div>
    )
}