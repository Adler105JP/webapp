'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "@/app/context/authContext"
import ProtectedRoute from '@/components/auth/protectedRoute'

import { CalendarIcon, SearchIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

//Demo data Emulare responce of API
const logs = [
    { id: 1, timestamp: "2023-05-01T12:00:00Z", level: "INFO", message: "User logged in" },
    { id: 2, timestamp: "2023-05-01T12:05:00Z", level: "WARNING", message: "High CPU usage detected" },
    { id: 3, timestamp: "2023-05-01T12:10:00Z", level: "ERROR", message: "Database connection failed" },
    { id: 4, timestamp: "2023-05-01T12:15:00Z", level: "INFO", message: "Backup completed successfully" },
    { id: 5, timestamp: "2023-05-01T12:20:00Z", level: "DEBUG", message: "Cache cleared" },
  ]


export default function Dashboard() {
    const [date, setDate] = useState()
    const [searchQuery, setSearchQuery] = useState("")
    const { user, Logout } = useSession()
    const router = useRouter()

    return (
    <ProtectedRoute>
        <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Log Dashboard</h1>
        
        <div className="flex justify-between items-center mb-6">
            <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar  mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
            </Popover>
            
            <div className="flex items-center space-x-2">
            <Input type="text" placeholder="Search logs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-[300px]"/>
            <Button size="icon">
                <SearchIcon className="h-4 w-4" />
                <span className="sr-only">Search</span>
            </Button>
            </div>
        </div>
        
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Message</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {logs.map((log) => (
                <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.level === "INFO" ? "bg-blue-100 text-blue-800" :
                        log.level === "WARNING" ? "bg-yellow-100 text-yellow-800" :
                        log.level === "ERROR" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                    }`}>
                        {log.level}
                    </span>
                    </TableCell>
                    <TableCell>{log.message}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">
                Showing 1 to 5 of 5 results
            </p>
            </div>
            <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
                Previous
            </Button>
            <Button variant="outline" size="sm">
                Next
            </Button>
            </div>
        </div>
        </div>
    </ProtectedRoute>
    )
}