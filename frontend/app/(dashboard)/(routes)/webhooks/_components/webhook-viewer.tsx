"use client"

import { Webhook } from "@/types/webhook";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import { WebhookForm } from "./webhook-form";
import { WebhookList } from "./webhook-list";
import { useState } from "react";

interface WebhookViewerProps {
    webhooks: Webhook[],
    eventTypes: string[]
}

export function WebhookViewer({
    webhooks,
    eventTypes
}: WebhookViewerProps) {

    const [selectedWebhook, setSelectedWebhook] = useState<Webhook | undefined>(undefined)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard} />
                    <h2 className="text-xl">
                        Create a New Webhook
                    </h2>
                </div>
                <WebhookForm key={selectedWebhook?.id} initialData={selectedWebhook} eventTypes={eventTypes} resetForm={()=>setSelectedWebhook(undefined)}/>
            </div>

            <div className="col-span-2">
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard} />
                    <h2 className="text-xl">
                        Webhook List
                    </h2>
                </div>
                <WebhookList webhooks={webhooks} editWebhook={(webhook)=>setSelectedWebhook(webhook)} />
            </div>
        </div>
    )
}