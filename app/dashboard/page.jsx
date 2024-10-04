'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "@/app/context/authContext"
import ProtectedRoute from '@/components/auth/protectedRoute'

import { CalendarIcon, SearchIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"


export default function Dashboard() {

    const { user, Logout } = useSession()
    const router = useRouter()

    return (
        <ProtectedRoute>
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
            <p className="mb-4">Welcome, {user ? user.username : null}!</p>
            <button
                onClick={Logout}
                className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
            >
                Logout
            </button>
        </div>
        </ProtectedRoute>
    )
}