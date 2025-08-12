import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BarChart3, Users, Package } from 'lucide-react'

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Welcome to Your
              <span className="text-blue-600 block">Enterprise Suite</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline your business operations with our comprehensive ERP solution. 
              Manage everything from inventory to finances in one unified platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <BarChart3 className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">Real-time business insights</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur mt-8">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">HR Management</h3>
                <p className="text-sm text-gray-600">Employee lifecycle management</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur -mt-4">
              <CardContent className="p-6">
                <Package className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Inventory</h3>
                <p className="text-sm text-gray-600">Stock management made easy</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur mt-4">
              <CardContent className="p-6">
                <div className="w-8 h-8 bg-orange-600 rounded mb-4 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">$</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Finance</h3>
                <p className="text-sm text-gray-600">Complete financial control</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
