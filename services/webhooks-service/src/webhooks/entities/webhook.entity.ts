export class Webhook {
    constructor(id: number, name: string, url: string, event_types: string[] = []) {
        this.id=id;
        this.name=name;
        this.url=url;
        this.event_types=event_types;
    }
    id: number
    name: string
    url: string
    event_types: string[]
}
