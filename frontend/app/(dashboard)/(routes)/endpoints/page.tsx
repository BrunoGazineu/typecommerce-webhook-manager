import webhookManager from "@/services/webhook-manager-service"

export default async function Endpoints() {
    const endpoints = await webhookManager.get({
        resource: "endpoints"
    })

    console.log(endpoints)
    
    return (
        <></>
    )
}