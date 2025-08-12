'use client'

import ProtectedRoute from "@/components/auth/protectedRoute"
import { DashboardChart } from "./dashborad-charts"
import { DashboardStats } from "./dashborard-stats"
import { RecentActivity } from "./activity"
import { Separator } from "@/components/ui/separator"

export default function Dashboard() {
    return(
        <ProtectedRoute>
            <div className="flex h-screen bg-background">
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 overflow-visible p-6">
                        <div className="space-y-6">
                            <div>
                            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-muted-foreground">
                                {'Welcome back! Here\'s what\'s happening with your business today.'}
                            </p>
                            </div>
                            
                            <DashboardStats />
                            <Separator/>
                            <DashboardChart />
                            <Separator/>
                            <RecentActivity />
                            
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    )
}