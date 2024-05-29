export interface Webhook {
    id?: number;
    name: string,
    url: string,
    event_types: string[] 
}