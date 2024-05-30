import webhookManager from "@/services/webhook-manager-service";
import { DeadLetterItem } from "./_components/dead-letter-item";
import { DeadLetter } from "@/types/dead-letter";

export default async function DeadLetters() {
    const deadLetters = await webhookManager.get({
        resource: "dead-letter-queue"
    })

    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                {deadLetters.data.map((deadLetter: DeadLetter)=><DeadLetterItem deadLetter={deadLetter} />)}
            </div>
        </div>
    )
}