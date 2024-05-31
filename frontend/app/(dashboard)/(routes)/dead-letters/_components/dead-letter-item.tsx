"use client"

import { deadLetterRetry } from "@/actions/dead-letter-actions";
import { handleActionResponse } from "@/actions/handler";
import { JsonEditor } from "@/components/json-editor";
import { Button } from "@/components/ui/button";
import { DeadLetter } from "@/types/dead-letter";
import { useRouter } from "next/navigation";

export function DeadLetterItem({
    deadLetter
}: {
    deadLetter: DeadLetter
} ) {
    const router = useRouter();

    const retry = async () => {
        const response = await deadLetterRetry(deadLetter.id, deadLetter.event);
        const success = handleActionResponse(response);

        if (success)
            router.refresh();
    }

    return (
        <div className="border bg-slate-100 rounded-md p-4 text-slate-500">
            <div className="text-slate-500 text-sm py-3">
                URL: {deadLetter.event.url}
            </div>
            <div className="text-slate-500 text-sm py-3">
                Created: {new Date(deadLetter.created).toLocaleDateString("pt-BR", {hour: "2-digit", minute: "2-digit", second: "2-digit"})}
            </div>
            <div className="text-slate-500 text-sm py-3">
                Event: {deadLetter.event.method}
            </div>

            <div className="text-slate-500 text-sm py-3">
                Message:
            </div>
            <JsonEditor initialData={deadLetter.event.message} editable={false}></JsonEditor>

            <div className="text-slate-500 text-sm py-3">
                Error:
            </div>
            <JsonEditor initialData={deadLetter.error} editable={false}></JsonEditor>

            <Button
                className="mt-4"
                onClick={retry}
            >
                Retry
            </Button>
        </div>
    )
}