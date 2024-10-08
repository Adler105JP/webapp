import React from 'react'
import ProtectedRoute from '../auth/protectedRoute'
import Link from 'next/link'

export default function NavigationBar() {
  return (
    <ProtectedRoute>
    <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/dashboard">Dashboard</Link>
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/analytics">Analytics</Link>
    </nav>
    </ProtectedRoute>
  )
}

