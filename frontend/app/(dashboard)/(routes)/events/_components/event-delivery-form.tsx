"use client"

import { sendEvent } from "@/actions/event-actions"
import { handleActionResponse } from "@/actions/handler"
import { EventTypeSelector } from "@/components/event-type-selector"
import { JsonEditor } from "@/components/json-editor"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function EventDeliveryForm({
    eventTypes
}: {
    eventTypes: string[]
}) {
    const router = useRouter();

    const [eventType, setEventType] = useState("")

    const initialData = {payload: {type: "Example"}}
    const [message, setMessage] = useState<Object>(initialData)


    const submit = async () => {
        const response = await sendEvent({
            event_type: eventType,
            message: message
        });

        const success = handleActionResponse(response);
    } 

    return (
        <div className="max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6">
            <div className="border bg-slate-100 rounded-md p-4">
                <div>
                    <h1 className="text-slate-500 text-2xl">
                        Send new Event
                    </h1>
                </div>
                <div className="text-slate-500 text-sm py-3">
                    Event Type
                </div>
                <div>
                    <EventTypeSelector
                        selectedEventTypes={eventType ? [eventType] : []}
                        eventTypes={eventTypes}
                        onAdd={setEventType}
                        onRemove={()=>{setEventType("")}}  />
                </div>

                <div className="text-slate-500 text-sm py-3">
                    Event Message
                </div>
                
                <div className="min-w-[400px] mb-4">
                    <JsonEditor
                        onChange={setMessage}
                        initialData={initialData}    
                    />
                </div>

                <Button
                    disabled={!eventType}
                    type="submit"
                    onClick={submit}
                >
                    Save
                </Button>
            </div>

        </div>
    )
}