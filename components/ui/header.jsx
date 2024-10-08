"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut } from "lucide-react"

import ProtectedRoute from "../auth/protectedRoute"
import NavigationBar from "./nav_bar"
import NavigationBar_Vertical from "./nav_bar_vertical"
import { useSession } from "@/app/context/authContext"
import md5 from "md5"
import { useEffect, useState } from "react" 

export default function DashboardHeader() {

    const { user, Logout } = useSession()
    const [ avatar, setAvatar] = useState("")

    useEffect(() => {
        if (user)
            setAvatar(`https://api.dicebear.com/9.x/adventurer/svg?seed=${md5(user.username)}`)
        
    }, [user])

    return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">Log System</span>
            </a>
            <NavigationBar/>
        </div>
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
            <NavigationBar_Vertical />
            </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <ProtectedRoute>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user ? user.last_name : null}, {user ? user.first_name : null}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user ? user.username : null}</p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={Logout}>
                    <LogOut className="mr-2 h-4 w-4" />Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            </ProtectedRoute>
        </div>
        </div>
    </header>
    )
}