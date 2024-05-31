export const endpointStatus = ["default", "badgateway", "timeout", "internal_error"] as const;

export type EndpointStatus = typeof endpointStatus[number]

export interface Endpoint {
    id: number;
    path: string;
    status: EndpointStatus
}