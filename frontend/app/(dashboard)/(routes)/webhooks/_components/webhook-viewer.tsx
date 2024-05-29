"use client"

import { Webhook } from "@/types/webhook";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import { WebhookForm } from "./webhook-form";

interface WebhookViewerProps {
    webhooks: Webhook[],
    eventTypes: string[]
}

export function WebhookViewer({
    webhooks,
    eventTypes
}: WebhookViewerProps) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">
                            Create a New Webhook
                        </h2>
                    </div>
                    <WebhookForm eventTypes={eventTypes} resetForm={()=>{}}/>
                </div>
            </div>
        </div>
    )
}