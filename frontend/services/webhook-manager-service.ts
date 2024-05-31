import axios, { AxiosError, AxiosResponse } from "axios"

const baseUrl = process.env.WEBHOOK_MANAGER_API_URL

type Resourses = "webhooks" | "events-delivery" | "dead-letter-queue" | "event-types" | "endpoints" | "webhooklogs"

type WebhookManagerOptions = {
    resource: Resourses;
    id?: number
}

type Response = {
    success: boolean
    data?: any
}

function createUrl(path: string, id?: number) {
    return `${baseUrl}/api/${path}${id ? `/${id}` : ''}`
}

const handleRequest = async (promise: Promise<AxiosResponse>) : Promise<Response> => {
    try {
        const response = await promise;
        return {success: true, data: response.data}
    }
    catch (error) {
        return {success: false, data: error}
    }
}

axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.common['Expires'] = '0';

async function get(options: WebhookManagerOptions) : Promise<Response> {
    const response = axios.get(createUrl(options.resource, options.id))
    return await handleRequest(response);
}

async function remove(options: WebhookManagerOptions & { id: number}) : Promise<Response> {
    const response = axios.delete(createUrl(options.resource, options.id))
    return await handleRequest(response);
}

async function post(options: WebhookManagerOptions & { body: Object }) : Promise<Response> {
    const response = axios.post(createUrl(options.resource, options.id), options.body);
    return await handleRequest(response);
}

async function patch(options: WebhookManagerOptions & { id: number, body: Object }) : Promise<Response> {
    const response = axios.patch(createUrl(options.resource, options.id), options.body);
    return await handleRequest(response);
}

const webhookManager = {get, remove, post, patch}

export default webhookManager;