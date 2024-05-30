"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface EventTypeSelectorProps {
    eventTypes: string[],
    selectedEventTypes: string[],
    onAdd: (eventType: string) => void,
    onRemove: (eventType: string) => void,
}

function EventType({
    name,
    onHold,
    onRelease,
    onRemove,
    canBeHeld = false
}: {
    name: string
    onHold: (name: string) => void
    onRelease: () => void
    onRemove: (name: string) => void
    canBeHeld?: boolean
}) {

    const [isBeingHeld, setIsBeingHeld] = useState<boolean>(false)
    const [mousePosition, setMousePosition] = useState<{x: number, y: number}>({x: 0, y: 0})

    const trackMousePosition = (event: MouseEvent) => {
        const [x, y] = [event.pageX, event.pageY];
        setMousePosition({x, y});
    }

    useEffect(()=>{
        if (isBeingHeld) {
            document.addEventListener("mousemove", trackMousePosition)
            document.addEventListener("mouseup", ()=>setIsBeingHeld(false))
            onHold(name);
        } else {
            document.removeEventListener("mousemove", trackMousePosition)
            onRelease()
        }
    }, [isBeingHeld]);

    return (
        <div
            draggable
            onDragStart={()=>canBeHeld && setIsBeingHeld(true)}
            className={cn(
                "text-center py-2 rounded-md min-w-[50px] border hover:bg-slate-100 border-slate-100 text-slate-600 shadow-sm text-[10px]",
                isBeingHeld ? `fixed` : ''
            )}
            style={isBeingHeld ? {
                left: mousePosition.x,
                top: mousePosition.y,
                transform: "translate(-50%, -50%)",
                padding: "0.5rem",
                pointerEvents: "none",
                cursor: "grabbing"
            } : {}}
        >
            <div className="relative">
                {!canBeHeld &&
                <div onClick={()=>onRemove(name)} className="absolute cursor-pointer top-0 right-0">
                    <X size={15} color="#333" />    
                </div>}
                <div className="cursor-default">
                    {name}
                </div>
            </div>
        </div>
    )
}

export function EventTypeSelector({
    eventTypes,
    selectedEventTypes,
    onAdd,
    onRemove
}: EventTypeSelectorProps) {
    const [heldedEventType, setHeldedEventType] = useState<string>("")
    const [isBeingHovered, setIsBeingHovered] = useState<boolean>(false)

    const validateDrop = () => {
        if (heldedEventType) {
            onAdd(heldedEventType);
            setHeldedEventType("");
            setIsBeingHovered(false)
        }
    }

    const validateMouseOver = (isOver: boolean) => {
        if (isOver && heldedEventType) {
            setIsBeingHovered(true);
        } else {
            setIsBeingHovered(false)
        }
    }

    return (
        <div className="w-full">
            <div onMouseUp={validateDrop} onMouseOver={()=>validateMouseOver(true)} onMouseLeave={()=>validateMouseOver(false)}
                className={cn(
                    "relative overflow-hidden mb-5 w-full min-h-10 p-2 bg-white rounded-md border border-input grid grid-cols-4 gap-2",
                    `${isBeingHovered ? "cursor-grabbing" : ""}`
                )}>
                {isBeingHovered && <div className="absolute top-0 left-0 h-full w-full opacity-40 bg-slate-400 z-50"></div>}
                {selectedEventTypes.length === 0 && <div className="py-2 px-3 whitespace-nowrap text-sm text text-gray-500 cursor-default col-span-2">Drag and drop here</div>}
                {selectedEventTypes.map(eventType => <EventType key={eventType} name={eventType} onHold={()=>{}} onRelease={()=>{}} onRemove={onRemove} />)}
            </div>

            <div className="w-full min-h-10 p-2 bg-white rounded-md grid grid-cols-4 gap-2">
                {eventTypes.map(eventType => (
                    !selectedEventTypes.includes(eventType) ?
                    <EventType
                        key={eventType}
                        name={eventType}
                        onHold={(name)=>setHeldedEventType(name)}
                        onRelease={()=>setHeldedEventType("")}
                        onRemove={()=>{}}
                        canBeHeld={true}
                    /> : <div key={eventType} className="hidden"></div>
                ))}
            </div>
        </div>
    )
}