import React from 'react'
import ProtectedRoute from '../auth/protectedRoute'
import Link from 'next/link'


export default function NavigationBar_Vertical() {
    return (
      <ProtectedRoute>
      <nav className="flex flex-col gap-4">
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/">Home</Link>
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/dashboard">Dashboard</Link>
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/analytics">Analytics</Link>
        <Link className="transition-colors hover:text-foreground/80 text-foreground" href="/reports">Reports</Link>
      </nav>
      </ProtectedRoute>
    )
  }
