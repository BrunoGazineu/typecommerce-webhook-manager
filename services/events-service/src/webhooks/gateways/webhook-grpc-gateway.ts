import { Inject, Injectable } from "@nestjs/common";
import { Webhook } from "../entities/webhook.entity";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom, Observable } from "rxjs";
import { IGateway } from "src/shared/gateways/gateway-interface";
import { Effect, Schedule, pipe } from "effect";

@Injectable()
export class WebhookGRPCGateway implements IGateway<Webhook> {
    private webhooksService;
    constructor(
        @Inject("WEBHOOKS_SERVICE")
        private readonly grpcClient: ClientGrpc
    ){
        this.webhooksService = this.grpcClient.getService("WebhooksService");
    }
    async findAll(): Promise<Webhook[]> {
        const response: Observable<{webhooks: {id: number, name: string, url: string, eventTypes: string[]}[]}> = await this.webhooksService.GetAllWebhooks({});

        const effect = Effect.tryPromise({
            try: () => firstValueFrom(response),
            catch: (error) => new Error(String(error))
        });

        const retryEffect = pipe(
            effect,
            Effect.retry(pipe(
                Schedule.recurs(10),
                Schedule.addDelay(()=>2000)
            ))
        );

        const { webhooks } = await Effect.runPromise(retryEffect);
        return webhooks.map((webhook) => {
            const {id, name, url, eventTypes} = webhook;
            return new Webhook(id, name, url, eventTypes);
        })
    }
    create(webhook: Webhook): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(webhook: Webhook): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    createMany(webhooks: Webhook[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Webhook> {
        throw new Error("Method not implemented.");
    }
    findAllByEventType(event_type: string): Promise<Webhook[]> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}