import webhookManager from "@/services/webhook-manager-service";
import { DeadLetterItem } from "./_components/dead-letter-item";
import { DeadLetter } from "@/types/dead-letter";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store'

export default async function DeadLetters() {
    const deadLetters = await webhookManager.get({
        resource: "dead-letter-queue"
    })

    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                {deadLetters.data.map((deadLetter: DeadLetter)=><DeadLetterItem key={deadLetter.id} deadLetter={deadLetter} />)}
            </div>
        </div>
    )
}