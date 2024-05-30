export interface ActionResponse {
    result: "success" | "error"
    message: string
}

export function handleRequest(response: any, successMessage: string) : ActionResponse {
    if (response.success)
        return {result: "success", message: successMessage}

    return {result: "error", message: response.data?.response?.data?.message[0] || "Unexpected error"};
}