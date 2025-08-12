import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis} from 'recharts'

export function DashboardChart() {
    const chartData = [
        { dia: 'Lunes', hombre: 7, mujer: 2 },
        { dia: 'Martes', hombre: 14, mujer: 1 },
        { dia: 'Miercoles', hombre: 13, mujer: 3 },
        { dia: 'Jueves', hombre: 3, mujer: 2 },
        { dia: 'Viernes', hombre: 11, mujer: 4 },
        { dia: 'Sabado', hombre: 0, mujer: 0 },
        { dia: 'Domingo', hombre: 0, mujer: 0 },
    ]

    const chartConfig = {
        hombre: {
            label: "hombre",
            color: "#2563eb",
        },
        mujer: {
            label: "mujer",
            color: "#60a5fa",
        },
    } 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="min-h-[150px] max-h-[400px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false}/>
                <XAxis dataKey="dia" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(val) => val.slice(0, 3)}/>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="hombre" fill='var(--color-hombre)' radius={4}/>
                <Bar dataKey="mujer" fill='var(--color-mujer)' radius={4}/>
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
