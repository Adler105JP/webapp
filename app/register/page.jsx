'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Register() {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        alert ("New user")
    }


    return (
    <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Register</CardTitle>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="Username">Username</Label>
                    <Input type="text" id="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Password">Password</Label>
                    <Input type="password" id="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Email">Email</Label>
                    <Input type="email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FirstName">First Name</Label>
                    <Input type="text" id="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="LastName">Last Name</Label>
                    <Input type="text" id="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <Button type="submit" className="w-full">Register</Button>
            </div>
        </form>
        </CardContent>
    </Card>
    )
    }
