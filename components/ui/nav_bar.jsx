import React from 'react'
import ProtectedRoute from '../auth/protectedRoute'
import UnProtectedRoute from '../auth/unprotectedRoute'
import Link from 'next/link'

export default function NavigationBar() {
  return (
    <nav className="hidden md:flex items-center space-x-6"> 
      <UnProtectedRoute>
        <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</Link>
        <Link href="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</Link>
      </UnProtectedRoute>
      
      <ProtectedRoute>
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/dashboard">Dashboard</Link>
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/log">Logs</Link>
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/analytics">Analytics</Link>
      </ProtectedRoute>
    </nav>
  )
}

