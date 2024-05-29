import axios from "axios"

const baseUrl = process.env.WEBHOOK_MANAGER_API_URL

type Resourses = "webhooks" | "events-delivery" | "dead-letter-queue" | "event-types" | "endpoints"

type WebhookManagerOptions = {
    resource: Resourses;
    id?: number
}

function createUrl(path: string, id?: number) {
    return `${baseUrl}/api/${path}${id ? `/${id}` : ''}`
}

async function get(options: WebhookManagerOptions) : Promise<any> {
    const response = await axios.get(createUrl(options.resource, options.id))
    return response.data;
}

async function remove(options: WebhookManagerOptions & { id: number}) : Promise<any> {
    const response = await axios.delete(createUrl(options.resource, options.id))
    return response.data;
}

async function post(options: WebhookManagerOptions & { body: Object }) : Promise<any> {
    const response = await axios.post(createUrl(options.resource, options.id), options.body);
    return response.data;
}

async function patch(options: WebhookManagerOptions & { id: number, body: Object }) : Promise<any> {
    const response = await axios.patch(createUrl(options.resource, options.id), options.body);
    return  response.data;
}

const webhookManager = {get, remove, post, patch}

export default webhookManager;