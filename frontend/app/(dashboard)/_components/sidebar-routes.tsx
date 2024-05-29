"use client"

import { CheckCheck, List, ListX, Send } from "lucide-react"
import SidebarItem from "./sidebar-item";

const routes = [
    {
        icon: List,
        label: "Webhooks",
        href: "/webhooks"
    },
    {
        icon: ListX,
        label: "Dead Letters",
        href: "/dead-letters"
    },
    {
        icon: Send,
        label: "Events",
        href: "/events"
    },
    {
        icon: CheckCheck,
        label: "Endpoints",
        href: "/endpoints"
    }
]

export default function SidebarRoutes() {

    return (
        <div className="felx flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}