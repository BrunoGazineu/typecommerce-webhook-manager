export interface DeadLetter {
    id: number
    event: WebhookEvent
    created: Date
    error: Object
}

export interface WebhookEvent {
    url: string,
    method: string,
    message: any
}