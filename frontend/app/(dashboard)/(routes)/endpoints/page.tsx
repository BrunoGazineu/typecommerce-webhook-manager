import webhookManager from "@/services/webhook-manager-service"
import { Endpoint } from "@/types/endpoint"
import { EndpointItem } from "./_components/endpoint-item"
import { WebhookLogsList } from "./_components/webhook-logs-list"

export const dynamic = 'force-dynamic';

export default async function Endpoints() {
    const endpoints = await webhookManager.get({
        resource: "endpoints"
    })

    const webhookLogs = await webhookManager.get({
        resource: "webhooklogs"
    })

    console.log(webhookLogs)

    return (
        <div className="grid grid-cols-3 gap-10">
            <div>
                <div className="text-slate-500 text-lg py-2">
                        Endpoints
                </div>
                {endpoints.data.map((endpoint: Endpoint)=><EndpointItem key={endpoint.id} endpoint={endpoint}/>)}
            </div>
            <div className="col-span-2">
                <div className="text-slate-500 text-lg py-2">
                        Webhook Logs
                </div>
                <WebhookLogsList initialLogs={webhookLogs.data} />
            </div>
        </div>
    )
}