import { HttpService } from "@nestjs/axios";
import { WebhookEvent } from "../entities/webhook-event.entity";
import { DeliveryResponse, IDeliveryService } from "./delivery-service-interface";
import { catchError, firstValueFrom } from "rxjs";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";

@Injectable()
export class HttpDeliveryService implements IDeliveryService {
    constructor(
        private readonly httpService: HttpService,
        private readonly logger: Logger
    ) {}

    async deliver(webhookEvent: WebhookEvent): Promise<DeliveryResponse> {
        console.log(webhookEvent.url)
        if (webhookEvent.url == "localhost:7002/analytics") return {success: true}

        const {url, ...data} = webhookEvent;
        const serviceObservable = this.httpService.post(webhookEvent.url, {...data})
            .pipe(
                catchError((error: AxiosError) => {
                    this.logger.error("[Delivery] Error delivering event to: " + url);
                    throw new HttpException(error.toJSON(), error.response?.status);
                })
            );
        
        try {
            const response = await firstValueFrom(serviceObservable);
            if (response.status < 300 && response.status >= 200)
                return {success: true}

            return {success: false, error: {status: response.status, data: response.data}}

        } catch (error: unknown) {
            if (error instanceof HttpException)
                return { success: false, error: {status: error.getStatus(), data: error.getResponse()} }

            return { success: false, error: error.toString() }
        }
    }
}