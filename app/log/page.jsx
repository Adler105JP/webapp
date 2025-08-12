'use client'

import { useState, useEffect } from 'react'
import { useSession } from "@/app/context/authContext"
import ProtectedRoute from '@/components/auth/protectedRoute'
import axios from 'axios'
import { useRouter } from "next/navigation"

import { CalendarIcon, ArrowUpIcon, ArrowDownIcon, Trash2Icon, PenIcon, PlusIcon} from "lucide-react"
import { format, isSameDay } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import Modal from '@/components/ui/modal'
import { Card, CardDescription, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


export default function Dashboard() {
    const [date, setDate] = useState()
    const [logs, setLogs] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState('desc')
    const { user, Logout, ValToken} = useSession()
    const router = useRouter()

    const [sortField, setSortField] = useState('timestamp')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set how many logs per page
    const totalPages = Math.ceil(logs.length / itemsPerPage);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const LabelSeverity = ["LOW", "NORMAL", "HIGTH", "IMMEDIATE"]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPopupWinOpen, setIsPopupWinOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const openPopupWin = () => setIsPopupWinOpen(true)
    const closePopupWin = () => setIsPopupWinOpen(false)

    const [Log_timestamp, setLogTimestamp] = useState()
    const [Log_message, setLogMessage] = useState()
    const [Log_severity, setLogSeverity] = useState()
    const [Log_source, setLogSource] = useState()

    const [selectIdLog, setIdSelectLog] = useState()
    const [isUpdate, setEditMode] = useState(false)

    const fetchLogs = async () => {
        if (user)
        {
            try
            {
                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
                const response = await axios.get(`${baseUrl}/api/logs/${user.id}`)
                setLogs(response.data)
            }
            catch (err)
            { 
                console.error("Error fetching logs:", err);
                if (err.status == 401 || err.status == 403)
                    Logout()
            }
        }
        else
            Logout()
    }

    useEffect(() => {
        ValToken()
        fetchLogs()
    }, [user, baseUrl, Logout])

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortField(field);
    }

    const sortedLogs = [...logs].sort((a, b) => {
        let aField = a[sortField];
        let bField = b[sortField];

        if (sortField === 'timestamp') {
            aField = new Date(aField);
            bField = new Date(bField);
        }

        if (aField < bField) return sortOrder === 'asc' ? -1 : 1;
        if (aField > bField) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    })  

    const filteredLogs = sortedLogs.filter((log) => {
        const matchesDate = date ? isSameDay(new Date(log.timestamp), date) : true;
        const matchesQuery = searchQuery ? log.message.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        const matchesStates = true
        return matchesDate && matchesQuery && matchesStates;
    });

    const currentLogs = filteredLogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSubmit = async (e) => {
        e.preventDefault()

        const request = async () => {
            try
            {
                const payload = {
                    "timestamp": Log_timestamp,
                    "severity": LabelSeverity.indexOf(Log_severity),
                    "source": Log_source,
                    "message": Log_message
                }

                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
                const response = isUpdate ? await axios.put(
                        `${baseUrl}/api/log/${selectIdLog}/user/${user.id}`,
                        payload,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }) : await axios.post(
                        `${baseUrl}/api/log/${user.id}`,
                        payload,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })

                if (response.status == 201 || response.status == 202)
                {
                    await fetchLogs()
                    closePopupWin()
                }
                else
                {
                    console.error(response)
                    closePopupWin()
                    alert("Unexpected error!")
                }
            }
            catch(err)
            {
                console.error("Error Api:", err)
            }
        }

        request()
    }

    const handleNewLog = () => {
        setLogTimestamp()
        setLogMessage()
        setLogSeverity()
        setLogSource()

        setEditMode(false)

        openPopupWin()
    }

    const handleEdit = (log) => {

        setLogTimestamp(log.timestamp)
        setLogMessage(log.message)
        setLogSeverity(LabelSeverity[log.severity])
        setLogSource(log.source)
        setIdSelectLog(log.id)

        setEditMode(true)

        openPopupWin()
    };

    const deleteLog = async () => {
        try
        {
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`
            const responce = await axios.delete(`${baseUrl}/api/log/${selectIdLog}/user/${user.id}`)

            if (responce.status == 202)
            {
                await fetchLogs()
                closeModal()
                setIdSelectLog(null)
            }
            else
            {
                console.error(responce)
                closeModal()
                setIdSelectLog(null)
                alert("Unexpected error!")
            }
        }
        catch (err)
        {
            console.error("Error Api:", err)
        }
    }

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
            <Input type="text" placeholder="Search logs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-[300px]"/>
            <Button className="mr-2 px-5" onClick={handleNewLog}><PlusIcon className="mr-2"/>New log</Button>
        </div>
        
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>
                    <Button onClick={() => handleSort('timestamp')} variant="ghost">
                        Timestamp {sortField === 'timestamp' && (sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4"/> : <ArrowDownIcon className="h-4 w-4"/>)}
                    </Button>
                </TableHead>
                <TableHead>Message</TableHead>
                <TableHead>
                    <Button onClick={() => handleSort('severity')} variant="ghost">
                        Severity {sortField === 'severity' && (sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4"/> : <ArrowDownIcon className="h-4 w-4"/>)}
                    </Button>
                </TableHead>
                <TableHead>Source</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {currentLogs.length > 0 ? currentLogs.map((log) => (
                <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.severity === 1 ? "bg-blue-100 text-blue-800" :
                        log.severity === 2 ? "bg-yellow-100 text-yellow-800" :
                        log.severity === 3 ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                    }`}>
                        {LabelSeverity[log.severity]}
                    </span>
                    </TableCell>
                    <TableCell>{log.source}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" alt="Actions">
                                    <DotsHorizontalIcon className="h-4 w-4"/>
                                </Button> 
                            </DropdownMenuTrigger>
                            <DropdownMenuContent > 
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={(e) => {handleEdit(log)}}><PenIcon className="mr-2 h-4 w-4"/>Update</DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => {openModal(); setIdSelectLog(log.id)}}><Trash2Icon className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                        No logs found.
                        </TableCell>
                    </TableRow>
                    )
                }
            </TableBody>
            </Table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">
                Showing {currentLogs.length > 0 ? ((currentPage - 1) * itemsPerPage + 1) : 0} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} results
            </p>
            </div>
            <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
            </Button>
            </div>
        </div>
        <Modal isOpen={isPopupWinOpen}>
            <Card> 
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Log</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="timestamp">Timestamp</Label>
                                <Input type="datetime-local" id="timestamp" value={Log_timestamp} onChange={(e) => {setLogTimestamp(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Input type="text" id="message" value={Log_message} onChange={(e) => {setLogMessage(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="severity">Severity</Label>
                                <Select value={Log_severity} onValueChange={setLogSeverity}>
                                    <SelectTrigger id="severity">
                                        <SelectValue placeholder="Select level of severity"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {LabelSeverity.map((value, index) => (
                                        <SelectItem key={index} value={value}>
                                            {value}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="source">Source</Label>
                                <Input type="text" id="source" value={Log_source} onChange={(e) => {setLogSource(e.target.value)}}/>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="px-10 mx-5" onClick={closePopupWin}>Cancel</Button>
                        <Button className="bg-blue-700 px-10 mx-5" type="submit" >Accept</Button>
                    </CardFooter>
                </form>
            </Card>
        </Modal>
        <Modal isOpen={isModalOpen}>
            <Card>
                <CardHeader>
                    <CardTitle>Delete Record</CardTitle>
                    <CardDescription>This action will delete permanently the record</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="px-10 mx-5" onClick={closeModal}>Cancel</Button>
                    <Button className="bg-red-700 px-10 mx-5" onClick={deleteLog} >Delete</Button>
                </CardFooter>
            </Card>
        </Modal>
        </div>
    </ProtectedRoute>
    )
}