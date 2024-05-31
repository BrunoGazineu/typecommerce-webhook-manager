"use client"

import { updateEndpoint } from "@/actions/endpoint-actions";
import { handleActionResponse } from "@/actions/handler";
import { SelectButton } from "@/components/select-button";
import { cn } from "@/lib/utils";
import { Endpoint, EndpointStatus, endpointStatus } from "@/types/endpoint";
import { useState } from "react";

export function EndpointItem({
    endpoint
}: {
    endpoint: Endpoint
}) {

    const [status, setStatus] = useState<string>(endpoint.status);
    const updateStatus = async (status: string) => {
        setStatus(status);
        const response = await updateEndpoint(endpoint.id, {...endpoint, status: status as EndpointStatus});
        const success = handleActionResponse(response);
    }

    return (
        <div className={cn(
            "grid items-center xl:grid-cols-2 gap-x-2 py-2 focus-visible:border-none cursor-pointer border rounded-md mb-4 text-sm px-2",
            status == "default" ? "bg-sky-100 border-sky-200 text-sky-700" : "bg-red-100 border-red-200 text-red-700"
        )}>
            <div>
                Path: {endpoint.path}
            </div>
            <div>
                <SelectButton
                    placeholder="Select Status"
                    options={endpointStatus.map(endpoint=>({name: endpoint, value: endpoint}))}
                    active={status}
                    onChange={updateStatus}
                />
            </div>
        </div>
    )
}