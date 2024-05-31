"use client"

import io from 'socket.io-client'

import { WebhookLog } from "@/types/webhook-log";
import { useEffect, useState } from "react"
import { WebhookLogItem } from "./webhook-log-item";
import toast from 'react-hot-toast';


export function WebhookLogsList({
    initialLogs
}: {
    initialLogs: any
}) {
    const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>(initialLogs);

    useEffect(() => {
        const socket = io(process.env.NEXT_PUBLIC_WEBHOOKLOG_WEBSOCKET_URL as string);
    
        socket.on('webhook_log', (data) => {
            setWebhookLogs(old=>[data, ...old])
            toast.success("New WebhookLog")
        })
    
        return () => {
          socket.disconnect();
        }
      }, [])
    return (
        <div className='grid grid-cols-3 gap-2'>
            {webhookLogs.map((webhookLog)=><WebhookLogItem key={webhookLog.id} webhookLog={webhookLog} />)}
        </div>
    )
}