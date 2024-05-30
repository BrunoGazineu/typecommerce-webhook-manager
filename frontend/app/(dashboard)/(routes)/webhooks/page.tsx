import webhookManager from "@/services/webhook-manager-service"
import { WebhookViewer } from "./_components/webhook-viewer"

export default async function Webhooks() {
    const webhooks = await webhookManager.get({
        resource: "webhooks"
    })

    const eventTypes = await webhookManager.get({
        resource: "event-types"
    })

    eventTypes.data.push({id: 12, name: "NOT_AN_EVENT"})

    return <WebhookViewer webhooks={webhooks.data} eventTypes={eventTypes.data.map((eventType: any) => eventType.name)}/>
}