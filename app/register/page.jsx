'use client'

import { useState } from 'react'
import axios from 'axios'
import { useSession } from '../context/authContext'


import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import PasswordStrengthMeter from '@/components/ui/password_strength_meter'

export default function Register() {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    const [userTaken, setUserTaken] = useState()
    const [passwordConsistency, setNOTConsistency] = useState()

    const [password2, setPassword2] = useState('')

    const { Login, error } = useSession()


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (userTaken || passwordConsistency)
        {
            alert("Errors to fiX !")
            return
        }

        const request = async () => {
            try
            {
                const payload = {
                    "email": email,
                    "user_name": username,
                    "first_name": firstName,
                    "last_name": lastName,
                    "password": password
                }

                const response = await axios.post(
                    `${baseUrl}/user/signup`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )

                if (response.data.result == 1)
                    Login(email, password)
                else
                {
                    console.log(response)
                    alert("Unexpected error!")
                }
            }
            catch(err)
            {
                console.error("Error fetching logs:", err)
            }
        }

        request()
    }

    const ValConsistencyPassword = () => {
        if (password !== password2)
            setNOTConsistency("Password Not match...")
    }

    const ValUser = () => {
        const request = async () => {
            try
            {
                const response = await axios.get(`${baseUrl}/user/valid_username/${username}`)
                if (response.data.result == -1)
                    setUserTaken(response.data.msg)
            }
            catch(err)
            {
                console.error("Error fetching logs:", err)
            }
        }

        request()
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
                    <Input type="text" id="Username" value={username} onChange={(e) => {setUsername(e.target.value);setUserTaken()}} onBlur={ValUser} required/>
                    {userTaken && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{userTaken}</AlertDescription>
                        </Alert>
                    )}
                </div>
                <Separator />
                <div className="space-y-2">
                    <Label htmlFor="Password">Password</Label>
                    <Input type="password" id="Password" value={password} onChange={(e) => {setPassword(e.target.value);setNOTConsistency()}} onBlur={ValConsistencyPassword} required/>
                    <PasswordStrengthMeter password={password}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Password">Re enter Password</Label>
                    <Input type="password" id="Password" value={password2} onChange={(e) => {setPassword2(e.target.value);setNOTConsistency()}} onBlur={ValConsistencyPassword} required/>
                </div>
                {passwordConsistency && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{passwordConsistency}</AlertDescription>
                    </Alert>
                )}
                <Separator />
                <div className="space-y-2">
                    <Label htmlFor="Email">Email</Label>
                    <Input type="email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FirstName">First Name</Label>
                    <Input type="text" id="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="LastName">Last Name</Label>
                    <Input type="text" id="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>
                <Button type="submit" className="w-full">Register</Button>
            </div>
        </form>
        </CardContent>
    </Card>
    )
    }
