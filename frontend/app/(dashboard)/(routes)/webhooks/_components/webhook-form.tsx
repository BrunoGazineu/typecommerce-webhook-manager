"use client"

import { createWebhook, updateWebhook } from "@/actions/webhook-actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Webhook } from "@/types/webhook"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { EventTypeSelector } from "./event-type-selector";
import { ActionResponse } from "@/actions/action-response";
import { handleActionResponse } from "@/actions/handler";

const webhookFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    url: z.string().min(1, {
        message: "Url is required"
    })
})

interface TitleFormProps {
    initialData?: Webhook,
    eventTypes: string[],
    resetForm: () => void
}

export function WebhookForm({
    initialData,
    eventTypes,
    resetForm
}: TitleFormProps) {
    const router = useRouter();

    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>(initialData?.event_types || [])

    const addEventType = (eventType: string) => setSelectedEventTypes((current) => [...current, eventType]);
    const removeEventType = (eventType: string) => setSelectedEventTypes((current) => current.filter((name) => name !== eventType));

    const isUpdating = Boolean(initialData);

    const form = useForm<z.infer<typeof webhookFormSchema>>({
        resolver: zodResolver(webhookFormSchema),
        defaultValues: {
            name: initialData?.name || "",
            url: initialData?.url || "",
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof webhookFormSchema>) => {
        const webhook = {...values, event_types: selectedEventTypes};

        let response: ActionResponse;

        if (isUpdating)
            response = await updateWebhook(initialData!.id!, webhook);
        else
            response = await createWebhook(webhook);

        const success = handleActionResponse(response);

        if (success)
            router.refresh();
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                >
                    <div className="text-slate-500 text-sm px-3">
                        Name
                    </div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isUpdating || isSubmitting}
                                        placeholder="Ex: Custom Webhook"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="text-slate-500 text-sm px-3 pt-2">
                        Url
                    </div>
                    <FormField
                        control={form.control}
                        name="url"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="Ex: http://endpoints-svc/cart"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="text-slate-500 text-sm px-3 pt-2">
                        Event Types
                    </div>
                    <EventTypeSelector
                        eventTypes={eventTypes}
                        selectedEventTypes={selectedEventTypes} 
                        onAdd={addEventType}
                        onRemove={removeEventType}    
                    />
                    <div className="flex gap-4">
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting || selectedEventTypes.length === 0}
                                type="submit"
                                >
                                Save
                            </Button>
                        </div>
                        {isUpdating && (
                            <div className="flex items-center gap-x-2">
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    variant={"outline"}
                                    onClick={resetForm}
                                >
                                    Clear
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}