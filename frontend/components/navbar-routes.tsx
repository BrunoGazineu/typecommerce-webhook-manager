"use client"

import Link from "next/link"
import { Button } from "./ui/button"

export default function NavbarRoutes() {
    return  (
        <div className="flex gap-x-2 ml-auto">
            <Link href="/webhooks">
                <Button size="sm" variant="ghost">
                    Webhooks
                </Button>
            </Link>

            <div className="rounded-full h-10 w-10 bg-gray-700">
            </div>
        </div>
    )
}