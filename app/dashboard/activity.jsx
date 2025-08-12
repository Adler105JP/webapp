import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'



const data = [
  {
    id:1,
    name: 'From 10-20',
    heatmap_url: 'https://lssys-s3.nyc3.cdn.digitaloceanspaces.com/VILLASARCANGEL/test/Heatmap%2010-20.png',
    message: '10|20',
  },
  {
    id:2,
    name: 'From 20-30',
    heatmap_url: 'https://lssys-s3.nyc3.cdn.digitaloceanspaces.com/VILLASARCANGEL/test/Heatmap%2020-30.png',
    message: '20|30',
  },
  {
    id:3,
    name: 'From 30-40',
    heatmap_url: 'https://lssys-s3.nyc3.cdn.digitaloceanspaces.com/VILLASARCANGEL/test/Heatmap%2030-40.png',
    message: '30|40',
  },
  {
    id:4,
    name: 'From 40+',
    heatmap_url: 'https://lssys-s3.nyc3.cdn.digitaloceanspaces.com/VILLASARCANGEL/test/Heatmap%20mas40.png',
    message: '40|40+',
  }
]

export function RecentActivity() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Heat Maps</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((row) => {
                const minAge = row.message.split("|")[0]
                const maxAge = row.message.split("|")[1]
                return (
                    <Card key={row.id} className="relative w-80 h-48 overflow-hidden bg-gray-900">
                        <CardContent>
                        <img src={row.heatmap_url} height="120px" alt={row.name} />
                        </CardContent>
                        <CardFooter>
                        <div className="justify-between items-center text-white">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{minAge}</div>
                                <div className="text-sm text-gray-300">EDAD MIN</div>
                            </div>
                            <div className="w-px h-8 bg-gray-500"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{maxAge}</div>
                                <div className="text-sm text-gray-300">EDAD MAX</div>
                            </div>
                        </div>
                        </CardFooter>
                    </Card>
                )
            })}
            </div>
        </CardContent>
    </Card>
  )
}
