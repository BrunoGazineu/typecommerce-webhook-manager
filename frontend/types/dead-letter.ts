export interface DeadLetter {
    id: number
    event: WebhookEvent
    error: Object
}

export interface WebhookEvent {
    url: string,
    method: string,
    message: any
}