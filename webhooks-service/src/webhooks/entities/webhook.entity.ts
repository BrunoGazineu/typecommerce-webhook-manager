export class Webhook {
    constructor(id: number, name: string, url: string, eventTypes: string[] = []) {
        this.id=id;
        this.name=name;
        this.url=url;
        this.eventTypes=eventTypes;
    }
    id: number
    name: string
    url: string
    eventTypes: string[]
}
