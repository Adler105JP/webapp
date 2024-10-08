'use client'

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const AuthContext = createContext(undefined)

export function AuthPorvider ({ children })
{
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const ValToken = async () => {
        const token = localStorage.getItem("token")
        if (token)
        {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            const err = await axios.get(`${baseUrl}/user/session_valid`)

            if (err.status == 401 || err.status == 403)
                Logout()
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser)
            setUser(JSON.parse(storedUser))

        ValToken()
        
    }, [])

    const Login = async (username, password) => {
        try
        {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setError()

            const dataReq = new FormData()
            dataReq.append("username", username)
            dataReq.append("password", password)

            const res = await axios.post(
                `${baseUrl}/user/login`,
                dataReq,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )

            axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`
            localStorage.setItem("token", res.data.access_token)
            const userData = {
                username: res.data.username,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                id: res.data.id
            }
            localStorage.setItem("user", JSON.stringify(userData))
            setUser(userData)
            router.push("/dashboard")
        }
        catch(err)
        {
            console.log("Login error: ", err)
            if (err.status == 401 )
                setError("Error while logging in, please check username and/or password.")
            else
                setError("unkown Error.")
        }
    }

    const Logout = () => {
        setError()
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common["Authorization"]
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{user, Login, Logout, error, ValToken}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useSession()
{
    const context = useContext(AuthContext)
    if (context === undefined)
        throw new Error("useSession must be used within a SessionProvider")

    return context
}

//export default AuthContext