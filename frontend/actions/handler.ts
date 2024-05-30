import toast from "react-hot-toast";
import { ActionResponse } from "./action-response";

export function handleActionResponse(response: ActionResponse) {
    switch (response.result) {
        case "success": toast.success(response.message); return true;
        case "error": toast.error(response.message); return false;
    }
}