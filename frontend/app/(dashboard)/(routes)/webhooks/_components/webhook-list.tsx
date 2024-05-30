import { Webhook } from "@/types/webhook";
import { WebhookItem } from "./webhook-item";

interface WebhookListProps {
    webhooks: Webhook[]
    editWebhook: (webhook: Webhook) => void
}

export function WebhookList({
    webhooks,
    editWebhook
}: WebhookListProps) {
    return (
        <div className="mt-6">
            {webhooks.map(webhook=><WebhookItem key={webhook.id} webhook={webhook} editWebhook={editWebhook} />)}
        </div>
    )
}