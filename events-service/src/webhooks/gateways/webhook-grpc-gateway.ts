import { Inject, Injectable } from "@nestjs/common";
import { IWebhookGateway } from "./webhook-gateway-interface";
import { Webhook } from "../entities/webhook.entity";
import { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom, Observable } from "rxjs";

@Injectable()
export class WebhookGRPCGateway implements IWebhookGateway {
    private webhooksService;
    constructor(
        @Inject("WEBHOOKS_SERVICE")
        private readonly grpcClient: ClientGrpc
    ){
        this.webhooksService = this.grpcClient.getService("WebhooksService");
    }
    async findAll(): Promise<Webhook[]> {
        const webhooks: Observable<Webhook[]> = await this.webhooksService.GetAllWebhooks({})
        return firstValueFrom(webhooks);
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
    findById(id: string): Promise<Webhook> {
        throw new Error("Method not implemented.");
    }
    findAllByEventType(event_type: string): Promise<Webhook[]> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}