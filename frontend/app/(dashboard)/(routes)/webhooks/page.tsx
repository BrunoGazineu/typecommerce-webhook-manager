import webhookManager from "@/services/webhook-manager-service"
import { WebhookViewer } from "./_components/webhook-viewer"

export default async function Webhooks() {
    const webhooks = await webhookManager.get({
        resource: "webhooks"
    })

    const eventTypes = await webhookManager.get({
        resource: "event-types"
    })

    return <WebhookViewer webhooks={webhooks} eventTypes={eventTypes.map((eventType: any) => eventType.name)}/>
}