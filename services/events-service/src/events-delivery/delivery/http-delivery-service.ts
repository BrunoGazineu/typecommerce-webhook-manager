import { HttpService } from "@nestjs/axios";
import { WebhookEvent } from "../entities/webhook-event.entity";
import { DeliveryResponse, IDeliveryService } from "./delivery-service-interface";
import { catchError, firstValueFrom } from "rxjs";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import * as HttpClient from "@effect/platform/HttpClient"
import { Effect, pipe, Schedule } from "effect";

@Injectable()
export class HttpDeliveryService implements IDeliveryService {
    constructor(
        private readonly httpService: HttpService,
        private readonly logger: Logger
    ) {}

    async deliver(webhookEvent: WebhookEvent, retries: number = 0, timeout?: 10_000): Promise<DeliveryResponse> {
        const {url, ...data} = webhookEvent;
        const serviceObservable = this.httpService.post(webhookEvent.url, {...data}, {timeout})
            .pipe(
                catchError((error: AxiosError) => {
                    this.logger.error("[Delivery] Error delivering event to: " + url);
                    throw new HttpException(error.toJSON(), error.response?.status);
                })
            );
        
        const effect = Effect.tryPromise({
            try: () => firstValueFrom(serviceObservable),
            catch: (error: HttpException) => new HttpException(error.message, error.getStatus())
        });

        const retryEffect = pipe(
            effect,
            Effect.retry(pipe(
                Schedule.recurs(retries),
                Schedule.addDelay(()=>1000)
            )),
        );

        try {
            const response = await Effect.runPromise(retryEffect);
            return {success: true}

        } catch (error: unknown) {
            if (error instanceof HttpException)
                return { success: false, error: {status: (error as HttpException).getStatus(), data: (error as HttpException).getResponse()} }
            return { success: false, error: error.toString() }
        }
    }
}