export class CreateWebhookLogDto {
    constructor(
        public endpointId: number,
        public payload: object
    ) {}
} 
