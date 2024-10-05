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

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser)
            setUser(JSON.parse(storedUser))
    }, [])

    const Login = async (username, password) => {
        try
        {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            
            const dataReq = new FormData()
            dataReq.append("username", username)
            dataReq.append("password", password)

            const res = await axios.post(
                "http://localhost:8000/user/login",
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
                last_name: res.data.last_name
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
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common["Authorization"]
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{user, Login, Logout, error}}>
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