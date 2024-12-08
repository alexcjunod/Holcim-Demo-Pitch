"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AlertCircle, Bell, Building2, ChevronDown, DollarSign, FileText, Globe2, Home, Package, PieChart as PieChartIcon, Plus, Search, Settings, Truck, Upload, Users, X } from 'lucide-react'
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import OrchestratorOnboardingPopup from "@/components/orchestrator-onboarding-popup"

const platformActivity = [
  { date: 'Jan', suppliers: 50, consumers: 120, transactions: 180 },
  { date: 'Feb', suppliers: 60, consumers: 150, transactions: 220 },
  { date: 'Mar', suppliers: 75, consumers: 180, transactions: 280 },
  { date: 'Apr', suppliers: 90, consumers: 220, transactions: 350 },
  { date: 'May', suppliers: 110, consumers: 260, transactions: 420 },
  { date: 'Jun', suppliers: 130, consumers: 300, transactions: 500 },
]

const materialDistribution = [
  { name: 'Cement', value: 35 },
  { name: 'Aggregates', value: 25 },
  { name: 'Concrete', value: 20 },
  { name: 'Other', value: 20 },
]

const recentMembers = [
  { 
    name: "Alice Johnson", 
    company: "Green Builders Inc.", 
    type: "Consumer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
  },
  { 
    name: "Bob Smith", 
    company: "EcoMaterials Ltd.", 
    type: "Supplier",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
  },
  { 
    name: "Carol Williams", 
    company: "Sustainable Projects Co.", 
    type: "Consumer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol"
  },
]

export default function OrchestratorDashboard() {
  const [showDashboard, setShowDashboard] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAlert, setShowAlert] = useState(true)

  const handleOnboardingComplete = () => {
    setShowDashboard(true)
    localStorage.setItem('orchestratorOnboardingComplete', 'true')
  }

  if (!showDashboard) {
    return <OrchestratorOnboardingPopup onComplete={handleOnboardingComplete} />
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
          <Button 
            variant="ghost" 
            className="justify-start gap-2 text-blue-600"
            onClick={() => setShowOnboarding(true)}
          >
            <FileText className="h-4 w-4" />
            View Onboarding Guide
          </Button>
          <Separator className="my-2" />
          <Button variant="ghost" className="justify-start gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Users className="h-4 w-4" />
            Users
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Package className="h-4 w-4" />
            Materials
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <DollarSign className="h-4 w-4" />
            Transactions
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Globe2 className="h-4 w-4" />
            Sustainability
          </Button>
          <Separator className="my-2" />
          <Button variant="ghost" className="justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      {showOnboarding && (
        <OrchestratorOnboardingPopup 
          onComplete={() => setShowOnboarding(false)} 
        />
      )}

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-4 md:px-6">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users, materials..."
                className="w-72 bg-white pl-8 focus-visible:ring-[#94C12E]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <span>Admin User</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="p-6 space-y-8">
          {showAlert && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="flex items-center justify-between">
                Critical Issue Detected
                <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </AlertTitle>
              <AlertDescription>
                Supplier "EcoCement Co." has reported a potential contamination in their latest batch of low-carbon cement. 
                Affected order numbers: #12345, #12346, #12347. Immediate action required.
              </AlertDescription>
            </Alert>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-4">Platform Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,345</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.4M</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Materials</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+32 new this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
                  <Globe2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,678 t</div>
                  <p className="text-xs text-muted-foreground">+5% from last quarter</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Platform Activity</h2>
            <Card>
              <CardHeader>
                <CardTitle>User and Transaction Growth</CardTitle>
                <CardDescription>Monthly overview of platform engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={platformActivity}>
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="suppliers" stroke="#1D4370" strokeWidth={2} />
                    <Line yAxisId="left" type="monotone" dataKey="consumers" stroke="#94C12E" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#FF6B6B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section>
              <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Latest Platform Activity</CardTitle>
                  <CardDescription>Most recent transactions across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { buyer: "Acme Construction", seller: "EcoCement Co.", material: "Low-Carbon Cement", amount: "$50,000" },
                      { buyer: "GreenBuild Ltd.", seller: "Holcim", material: "Recycled Aggregates", amount: "$30,000" },
                      { buyer: "Sustainable Structures", seller: "EcoSteel Inc.", material: "Recycled Steel", amount: "$75,000" },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{transaction.buyer} → {transaction.seller}</p>
                          <p className="text-sm text-muted-foreground">{transaction.material}</p>
                        </div>
                        <Badge variant="secondary">{transaction.amount}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Transactions</Button>
                </CardFooter>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">New Members</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Recently Joined</CardTitle>
                  <CardDescription>New users in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMembers.map((member, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.company}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">{member.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Members</Button>
                </CardFooter>
              </Card>
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">Material Distribution</h2>
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Distribution of materials across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={materialDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {materialDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#1D4370', '#94C12E', '#FF6B6B', '#4ECDC4'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Recent Postings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Latest Material Listings</CardTitle>
                <CardDescription>Recently added or updated materials on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Ultra-Low Carbon Concrete", supplier: "Holcim", price: "$120/ton", sustainability: "90%" },
                    { name: "Recycled Steel Beams", supplier: "GreenSteel Co.", price: "$800/ton", sustainability: "95%" },
                    { name: "Bamboo Flooring", supplier: "EcoFloor Solutions", price: "$45/sqm", sustainability: "98%" },
                  ].map((material, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-muted-foreground">{material.supplier}</p>
                      </div>
                      <div className="text-right">
                        <p>{material.price}</p>
                        <Badge variant="secondary">{material.sustainability} sustainable</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Materials</Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}