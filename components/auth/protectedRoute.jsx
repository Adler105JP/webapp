'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/app/context/authContext"

export default function ProtectedRoute({ children, NOTAuthRequired}) {
    const { user } = useSession()
    const router = useRouter()

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (!storedUser)
            router.replace("/")
    }, [router])
    
    if (NOTAuthRequired)
        return children

    return user ? children : null
}
