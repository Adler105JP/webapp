'use client'

import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/app/context/authContext"

export default function ProtectedRoute({ children }) {
    const { user } = useSession()
    const router = useRouter()

    console.log(user)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (!storedUser)
            router.replace("/")
    }, [router])
    
    return user ? children : null
}
