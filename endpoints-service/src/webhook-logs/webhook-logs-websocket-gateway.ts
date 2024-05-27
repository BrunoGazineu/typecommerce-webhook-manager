import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { WebhookLog } from "./entities/webhook-log.entity";
import { Server } from "socket.io";

@WebSocketGateway()
export class WebhookLogsWebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: any, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`)
    }

    sendNewWebhookLog(endpointId: number, webhookLog: WebhookLog) {
        console.log("Emitting")
        this.server.emit(`webhook_log_${endpointId}`, webhookLog)
    }
}