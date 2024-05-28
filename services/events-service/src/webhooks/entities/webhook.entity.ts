export class Webhook {
    constructor(
        public id: number,
        public name: string,
        public url: string,
        public event_types: string[] 
    ) {}
}