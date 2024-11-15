"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, Building2, ChevronDown, FileText, Globe2, Home, Package, PieChart, Plus, Settings, Truck, Leaf, Recycle, X } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SupplierOnboardingPopup from "@/components/supplier-onboarding-popup"

const emissionsData = [
  { stage: 'Raw Materials', emissions: 250 },
  { stage: 'Transportation', emissions: 100 },
  { stage: 'Manufacturing', emissions: 500 },
  { stage: 'Distribution', emissions: 150 },
  { stage: 'Use Phase', emissions: 50 },
  { stage: 'End of Life', emissions: 30 },
]

const monthlyEmissions = [
  { month: 'Jan', emissions: 1200 },
  { month: 'Feb', emissions: 1100 },
  { month: 'Mar', emissions: 1300 },
  { month: 'Apr', emissions: 1150 },
  { month: 'May', emissions: 1000 },
  { month: 'Jun', emissions: 950 },
]

const products = [
  { id: 1, name: "ECOPlanet Cement", description: "Low-carbon cement for sustainable construction" },
  { id: 2, name: "Recycled Aggregate", description: "Sustainable alternative to natural aggregates" },
  { id: 3, name: "GreenConcrete Mix", description: "Eco-friendly concrete mix with reduced carbon footprint" },
]

const lifecycleData = [
  { stage: 'Raw Materials', co2: 120, water: 450, waste: 20 },
  { stage: 'Manufacturing', co2: 250, water: 800, waste: 35 },
  { stage: 'Transportation', co2: 80, water: 100, waste: 5 },
  { stage: 'Use Phase', co2: 300, water: 600, waste: 15 },
  { stage: 'End of Life', co2: 50, water: 200, waste: 40 },
]

const monthlyProgress = [
  { month: 'Jan', reduction: 0 },
  { month: 'Feb', reduction: 5 },
  { month: 'Mar', reduction: 8 },
  { month: 'Apr', reduction: 15 },
  { month: 'May', reduction: 20 },
  { month: 'Jun', reduction: 25 },
]

function ProductEnvironmentalImpact({ product }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">-25%</div>
            <p className="text-xs text-muted-foreground">vs. industry standard</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Water Usage</CardTitle>
            <Recycle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">-30%</div>
            <p className="text-xs text-muted-foreground">reduction in water consumption</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recycled Content</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">40%</div>
            <p className="text-xs text-muted-foreground">recycled materials used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Transport Emissions</CardTitle>
            <Truck className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">-15%</div>
            <p className="text-xs text-muted-foreground">reduced transport emissions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lifecycle" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lifecycle">Lifecycle Analysis</TabsTrigger>
          <TabsTrigger value="progress">Carbon Reduction Progress</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>
        <TabsContent value="lifecycle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact Across Lifecycle</CardTitle>
              <CardDescription>Breakdown of environmental metrics across different stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={lifecycleData}>
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="co2" name="CO2 (kg)" fill="#22c55e" />
                  <Bar dataKey="water" name="Water (L)" fill="#3b82f6" />
                  <Bar dataKey="waste" name="Waste (kg)" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Reduction Progress</CardTitle>
              <CardDescription>Monthly progress in reducing carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyProgress}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="reduction" 
                    name="CO2 Reduction (%)"
                    stroke="#22c55e" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Certifications</CardTitle>
              <CardDescription>Product compliance and environmental certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                  <Image 
                    src="/placeholder.svg" 
                    alt="EPD Certified" 
                    width={80} 
                    height={80}
                    className="opacity-80"
                  />
                  <span className="text-sm font-medium">EPD Certified</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                  <Image 
                    src="/placeholder.svg" 
                    alt="EN 15804" 
                    width={80} 
                    height={80}
                    className="opacity-80"
                  />
                  <span className="text-sm font-medium">EN 15804</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                  <Image 
                    src="/placeholder.svg" 
                    alt="ISO 14040" 
                    width={80} 
                    height={80}
                    className="opacity-80"
                  />
                  <span className="text-sm font-medium">ISO 14040</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                  <Image 
                    src="/placeholder.svg" 
                    alt="ECO Platform" 
                    width={80} 
                    height={80}
                    className="opacity-80"
                  />
                  <span className="text-sm font-medium">ECO Platform</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Environmental Declaration</CardTitle>
          <CardDescription>Detailed environmental product declaration and compliance information</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>This product has been assessed according to EN 15804 and ISO 14025 standards for Environmental Product Declarations (EPD). The assessment covers the entire product lifecycle from raw material extraction through manufacturing, transport, use, and disposal.</p>
          <p>Key achievements:</p>
          <ul>
            <li>25% reduction in carbon footprint compared to traditional products</li>
            <li>Water usage optimization through closed-loop recycling systems</li>
            <li>40% recycled content incorporation in manufacturing</li>
            <li>Optimized transportation routes reducing emissions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SupplierDashboard() {
  const [showDashboard, setShowDashboard] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleOnboardingComplete = () => {
    setShowDashboard(true)
    localStorage.setItem('supplierOnboardingComplete', 'true')
  }

  if (!showDashboard) {
    return <SupplierOnboardingPopup onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="hidden w-64 border-r bg-white lg:block">
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Holcim_idvoMN9469_6.png" alt="Holcim Logo" width={32} height={32} />
            <span className="text-lg font-semibold text-[#1D4370]">Holcim Connect</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Button variant="ghost" className="justify-start gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Package className="h-4 w-4" />
            Products
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Globe2 className="h-4 w-4" />
            Emissions
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Truck className="h-4 w-4" />
            Orders
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <PieChart className="h-4 w-4" />
            Analytics
          </Button>
          <Separator className="my-2" />
          <Button variant="ghost" className="justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-4 md:px-6">
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <span>Acme Corp</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">254</div>
                  <p className="text-xs text-muted-foreground">+5 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Carbon Emissions</CardTitle>
                  <Globe2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234 t</div>
                  <p className="text-xs text-muted-foreground">-2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">43</div>
                  <p className="text-xs text-muted-foreground">Processing now</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$54,231</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Concrete Value Chain Emissions</h2>
            <Card>
              <CardHeader>
                <CardTitle>Emissions by Stage</CardTitle>
                <CardDescription>CO2 equivalent emissions across the concrete production lifecycle</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emissionsData}>
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="emissions" fill="#94C12E" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Emissions Trend</h2>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Emissions</CardTitle>
                <CardDescription>Total CO2 equivalent emissions over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyEmissions}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="emissions" stroke="#1D4370" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Product Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>Manage your sustainable product offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Product List</h3>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add New Product
                    </Button>
                  </div>
                  <div className="rounded-md border">
                    {products.map((product) => (
                      <React.Fragment key={product.id}>
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" onClick={() => setSelectedProduct(product)}>
                                View Environmental Impact
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{product.name} - Environmental Impact</DialogTitle>
                                <DialogDescription>
                                  Detailed environmental impact analysis for {product.name}
                                </DialogDescription>
                              </DialogHeader>
                              <ProductEnvironmentalImpact product={product} />
                            </DialogContent>
                          </Dialog>
                        </div>
                        {product.id !== products.length && <Separator />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Order Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Track and manage your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <h4 className="font-medium">Order #1234</h4>
                      <p className="text-sm text-muted-foreground">Customer: Acme Construction</p>
                      <p className="text-sm text-muted-foreground">Status: Processing</p>
                    </div>
                    <Separator />
                    <div className="p-4">
                      <h4 className="font-medium">Order #1235</h4>
                      <p className="text-sm text-muted-foreground">Customer: BuildRight Inc.</p>
                      <p className="text-sm text-muted-foreground">Status: Shipped</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Product Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,543</div>
                  <p className="text-xs text-muted-foreground">+7% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground">+0.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,243</div>
                  <p className="text-xs text-muted-foreground">-2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5</div>
                  <p className="text-xs text-muted-foreground">Based on 234 reviews</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}