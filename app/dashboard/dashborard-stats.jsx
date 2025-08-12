import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DoorOpen, BellElectric} from 'lucide-react'

const stats = [
  {
    title: 'Entradas',
    value: '60',
    change: '+3%',
    icon: BellElectric,
  },
  {
    title: 'Salidas',
    value: '6',
    change: '-2%',
    icon: DoorOpen,
  },
  {
    title: 'Hombres',
    value: '48',
    change: '+1%',
    icon: null
  },
  {
    title: 'Mujeres',
    value: '12',
    change: '+6%',
    icon: null,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
            <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                {stat.change}
                </p>
            </CardContent>
            </Card>
        );
      })}
    </div>
  )
}
