import webhookManager from "@/services/webhook-manager-service";
import EventDeliveryForm from "./_components/event-delivery-form";

export const dynamic = 'force-dynamic';

export default async function Events() {
    const eventTypes = await webhookManager.get({
        resource: "event-types"
    });
    
    return (
        <EventDeliveryForm eventTypes={eventTypes.data.map((eventType: any)=>eventType.name)} />
    )
}