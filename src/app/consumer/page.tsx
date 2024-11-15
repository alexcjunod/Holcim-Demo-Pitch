"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bell, Building2, ChevronDown, FileText, Globe2, Home, Package, Search, Settings, Truck, Upload, Users, AlertTriangle, BarChart3, Leaf, Zap, Calendar, DollarSign, TrendingDown, TrendingUp, X, MessageSquare, Bot, ArrowUpRight } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import BuyerOnboardingPopup from "@/components/buyer-onboarding-popup"

const projectEmissions = [
  { project: 'Office Building A', emissions: 1200, target: 1000 },
  { project: 'Residential Complex B', emissions: 950, target: 900 },
  { project: 'Infrastructure Project C', emissions: 1500, target: 1400 },
  { project: 'Retail Center D', emissions: 800, target: 850 },
]

const monthlyEmissions = [
  { month: 'Jan', emissions: 1200, target: 1300 },
  { month: 'Feb', emissions: 1100, target: 1250 },
  { month: 'Mar', emissions: 1300, target: 1200 },
  { month: 'Apr', emissions: 1150, target: 1150 },
  { month: 'May', emissions: 1000, target: 1100 },
  { month: 'Jun', emissions: 950, target: 1050 },
]

const materialData = [
  { id: 1, name: 'Standard Concrete', type: 'Concrete', supplier: 'ConcreteWorks Inc.', carbon: 100, cost: 50, durability: 70, strength: 30, recyclability: 20, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Low-Carbon Concrete', type: 'Concrete', supplier: 'GreenConcrete Co.', carbon: 70, cost: 60, durability: 75, strength: 32, recyclability: 30, image: '/placeholder.svg?height=100&width=100' },
  { id: 3, name: 'Ultra-Low-Carbon Concrete', type: 'Concrete', supplier: 'EcoCement Solutions', carbon: 50, cost: 75, durability: 80, strength: 35, recyclability: 40, image: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Recycled Aggregate Concrete', type: 'Concrete', supplier: 'RecyclePro Materials', carbon: 60, cost: 55, durability: 72, strength: 28, recyclability: 60, image: '/placeholder.svg?height=100&width=100' },
  { id: 5, name: 'Standard Steel', type: 'Steel', supplier: 'SteelWorks Ltd.', carbon: 150, cost: 80, durability: 85, strength: 50, recyclability: 70, image: '/placeholder.svg?height=100&width=100' },
  { id: 6, name: 'Recycled Steel', type: 'Steel', supplier: 'GreenSteel Inc.', carbon: 100, cost: 75, durability: 83, strength: 48, recyclability: 90, image: '/placeholder.svg?height=100&width=100' },
  { id: 7, name: 'High-Strength Steel', type: 'Steel', supplier: 'ToughSteel Corp.', carbon: 180, cost: 100, durability: 90, strength: 60, recyclability: 65, image: '/placeholder.svg?height=100&width=100' },
  { id: 8, name: 'Pine', type: 'Wood', supplier: 'NaturalWood Suppliers', carbon: 20, cost: 40, durability: 50, strength: 20, recyclability: 80, image: '/placeholder.svg?height=100&width=100' },
  { id: 9, name: 'Oak', type: 'Wood', supplier: 'PremiumTimber Co.', carbon: 25, cost: 60, durability: 70, strength: 30, recyclability: 75, image: '/placeholder.svg?height=100&width=100' },
  { id: 10, name: 'Engineered Wood', type: 'Wood', supplier: 'TechWood Innovations', carbon: 30, cost: 55, durability: 65, strength: 35, recyclability: 70, image: '/placeholder.svg?height=100&width=100' },
  { id: 11, name: 'Standard Glass', type: 'Glass', supplier: 'ClearView Glass', carbon: 80, cost: 45, durability: 60, strength: 25, recyclability: 95, image: '/placeholder.svg?height=100&width=100' },
  { id: 12, name: 'Low-E Glass', type: 'Glass', supplier: 'EnergySmartGlass', carbon: 85, cost: 55, durability: 65, strength: 26, recyclability: 90, image: '/placeholder.svg?height=100&width=100' },
  { id: 13, name: 'Tempered Glass', type: 'Glass', supplier: 'SafeGlass Technologies', carbon: 90, cost: 60, durability: 75, strength: 40, recyclability: 85, image: '/placeholder.svg?height=100&width=100' },
]

interface Material {
  id: number;
  name: string;
  type: string;
  supplier: string;
  carbon: number;
  cost: number;
  durability: number;
  strength: number;
  recyclability: number;
  image: string;
}

interface SearchResultsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  searchCriteria: {
    material?: string;
    maxPrice?: number;
    maxCarbon?: number | null;
    minRecycled?: number | null;
  };
}

interface ChatbotPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function SearchResultsPopup({ isOpen, onClose, searchCriteria }: SearchResultsPopupProps) {
  const filteredResults = materialData.filter(material => {
    return (
      (!searchCriteria.material || material.type.toLowerCase() === searchCriteria.material.toLowerCase()) &&
      (!searchCriteria.maxCarbon || material.carbon <= searchCriteria.maxCarbon) &&
      (!searchCriteria.maxPrice || material.cost <= searchCriteria.maxPrice) &&
      (!searchCriteria.minRecycled || material.recyclability >= searchCriteria.minRecycled)
    )
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Search Results</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="space-y-4 overflow-y-auto max-h-[60vh]">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <Card key={result.id}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <Image
                          src={result.image}
                          alt={result.name}
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                        <div>
                          <CardTitle>{result.name}</CardTitle>
                          <CardDescription>{result.supplier}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium">Carbon Footprint</p>
                            <p className="text-2xl font-bold">{result.carbon} kg CO2e</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Cost</p>
                            <p className="text-2xl font-bold">${result.cost}/unit</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Recyclability</p>
                            <p className="text-2xl font-bold">{result.recyclability}%</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xl font-semibold">No results found</p>
                    <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MaterialComparison() {
  const [comparisonMaterials, setComparisonMaterials] = useState<Material[]>([])
  const [openComparison, setOpenComparison] = useState(false)

  const addToComparison = (material: Material) => {
    if (comparisonMaterials.length < 4 && !comparisonMaterials.some(m => m.id === material.id)) {
      setComparisonMaterials([...comparisonMaterials, material])
      setOpenComparison(false)
    }
  }

  const removeFromComparison = (materialId: number) => {
    setComparisonMaterials(comparisonMaterials.filter(m => m.id !== materialId))
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Material Comparison</CardTitle>
        <CardDescription>Compare selected materials based on key metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Popover open={openComparison} onOpenChange={setOpenComparison}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openComparison}
                    className="w-full justify-between"
                  >
                    {comparisonMaterials.length > 0
                      ? `${comparisonMaterials.length} material${comparisonMaterials.length > 1 ? 's' : ''} selected`
                      : "Select materials to compare"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search materials..." />
                    <CommandList>
                      <CommandEmpty>No materials found.</CommandEmpty>
                      <CommandGroup>
                        {materialData.map((material) => (
                          <CommandItem
                            key={material.id}
                            value={material.name}
                            onSelect={() => {
                              addToComparison(material)
                            }}
                            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{material.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {material.supplier}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {material.type}
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <Button
              variant="outline"
              onClick={() => setComparisonMaterials([])}
              disabled={comparisonMaterials.length === 0}
            >
              Clear
            </Button>
          </div>
          {comparisonMaterials.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {comparisonMaterials.map((material) => (
                <Badge
                  key={material.id}
                  variant="secondary"
                  className="text-sm"
                >
                  {material.name}
                  <button
                    className="ml-1 text-muted-foreground hover:text-foreground"
                    onClick={() => removeFromComparison(material.id)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        {comparisonMaterials.length > 0 && (
          <Tabs defaultValue="table" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Carbon Footprint (kg CO2e/unit)</TableHead>
                    <TableHead>Cost ($/unit)</TableHead>
                    <TableHead>Durability Score</TableHead>
                    <TableHead>Strength (MPa)</TableHead>
                    <TableHead>Recyclability (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.supplier}</TableCell>
                      <TableCell>{material.carbon}</TableCell>
                      <TableCell>{material.cost}</TableCell>
                      <TableCell>{material.durability}</TableCell>
                      <TableCell>{material.strength}</TableCell>
                      <TableCell>{material.recyclability}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="chart">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonMaterials}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="carbon" fill="#ef4444" name="Carbon Footprint" />
                  <Bar dataKey="cost" fill="#3b82f6" name="Cost" />
                  <Bar dataKey="durability" fill="#22c55e" name="Durability" />
                  <Bar dataKey="strength" fill="#f59e0b" name="Strength" />
                  <Bar dataKey="recyclability" fill="#8b5cf6" name="Recyclability" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        )}
        {comparisonMaterials.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Key Insights:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {comparisonMaterials.map((material) => (
                <li key={material.id}>
                  {material.name} from {material.supplier} offers {material.carbon < 75 ? 'low' : 'standard'} carbon footprint
                  and {material.recyclability > 70 ? 'high' : 'moderate'} recyclability.
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AIRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI-Powered Recommendations
        </CardTitle>
        <CardDescription>Predictive analysis for carbon reduction strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowUpRight className="h-5 w-5 text-green-500 mt-0.5" />
            <span>Consider switching to low-carbon cement for your next project to reduce emissions by up to 15%.</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowUpRight className="h-5 w-5 text-green-500 mt-0.5" />
            <span>Optimize your supply chain routes to decrease transportation emissions by an estimated 8%.</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowUpRight className="h-5 w-5 text-green-500 mt-0.5" />
            <span>Implement energy-efficient practices at your construction sites to potentially save 10% on energy costs.</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Detailed Recommendations</Button>
      </CardFooter>
    </Card>
  )
}

function ChatbotPopup({ isOpen, onClose }: ChatbotPopupProps) {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! How can I assist you today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      // Simulate bot response (in a real scenario, this would be an API call)
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: 'Thank you for your message. Our team will get back to you soon with more information.' }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
            <h3 className="font-semibold">Holcim Assistant</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-64 p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ConsumerDashboard() {
  const [showDashboard, setShowDashboard] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('concrete')
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchCriteria, setSearchCriteria] = useState({})
  const [maxCarbon, setMaxCarbon] = useState('')
  const [minRecycled, setMinRecycled] = useState('')
  const [showChatbot, setShowChatbot] = useState(false)

  useEffect(() => {
    const onboardingComplete = localStorage.getItem('buyerOnboardingComplete')
    if (onboardingComplete === 'true') {
      setShowDashboard(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    setShowDashboard(true)
    localStorage.setItem('buyerOnboardingComplete', 'true')
  }

  const handleSearch = () => {
    setSearchCriteria({
      material: selectedMaterial,
      maxPrice: priceRange[1],
      maxCarbon: maxCarbon ? parseInt(maxCarbon) : null,
      minRecycled: minRecycled ? parseInt(minRecycled) : null,
    })
    setShowSearchResults(true)
  }

  if (!showDashboard) {
    return <BuyerOnboardingPopup onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
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
            Materials
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Building2 className="h-4 w-4" />
            Projects
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Globe2 className="h-4 w-4" />
            Emissions
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <FileText className="h-4 w-4" />
            Compliance
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Truck className="h-4 w-4" />
            Procurement
          </Button>
          <Button variant="ghost" className="justify-start gap-2">
            <Leaf className="h-4 w-4" />
            Circularity
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
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search materials, suppliers..."
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
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
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
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">2 nearing completion</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Carbon Emissions</CardTitle>
                  <Globe2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4,450 t</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      5% from last quarter
                    </span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sustainable Materials Used</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      12% from last project
                    </span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92/100</div>
                  <p className="text-xs text-muted-foreground">LEED Gold certified</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Material Search and Comparison</h2>
            <Card>
              <CardHeader>
                <CardTitle>Find Sustainable Materials</CardTitle>
                <CardDescription>Search and compare materials based on various criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <Label htmlFor="material-type">Material Type</Label>
                      <Select onValueChange={setSelectedMaterial} defaultValue={selectedMaterial}>
                        <SelectTrigger id="material-type">
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concrete">Concrete</SelectItem>
                          <SelectItem value="steel">Steel</SelectItem>
                          <SelectItem value="wood">Wood</SelectItem>
                          <SelectItem value="glass">Glass</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="carbon-footprint">Max Carbon Footprint (kg CO2e/unit)</Label>
                      <Input
                        id="carbon-footprint"
                        type="number"
                        placeholder="e.g., 100"
                        value={maxCarbon}
                        onChange={(e) => setMaxCarbon(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="certification">Certification</Label>
                      <Select>
                        <SelectTrigger id="certification">
                          <SelectValue placeholder="Select certification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leed">LEED</SelectItem>
                          <SelectItem value="breeam">BREEAM</SelectItem>
                          <SelectItem value="greenstar">Green Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Enter location" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="advanced-search" onCheckedChange={setShowAdvancedSearch} />
                    <Label htmlFor="advanced-search">Show Advanced Search Options</Label>
                  </div>
                  {showAdvancedSearch && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <Label htmlFor="price-range">Price Range ($/unit)</Label>
                        <div className="pt-2">
                          <Slider
                            id="price-range"
                            min={0}
                            max={1000}
                            step={10}
                            value={priceRange}
                            onValueChange={setPriceRange}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="delivery-time">Max Delivery Time (days)</Label>
                        <Input id="delivery-time" type="number" placeholder="e.g., 30" />
                      </div>
                      <div>
                        <Label htmlFor="recycled-content">Min Recycled Content (%)</Label>
                        <Input
                          id="recycled-content"
                          type="number"
                          placeholder="e.g., 50"
                          value={minRecycled}
                          onChange={(e) => setMinRecycled(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <Button className="mt-4" onClick={handleSearch}>Search Materials</Button>
              </CardContent>
            </Card>
            <MaterialComparison />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Carbon Accounting</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Emissions</CardTitle>
                  <CardDescription>CO2 equivalent emissions across active projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={projectEmissions}>
                      <XAxis dataKey="project" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="emissions" fill="#94C12E" name="Actual Emissions" />
                      <Bar dataKey="target" fill="#1D4370" name="Target Emissions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emissions Trend</CardTitle>
                  <CardDescription>Monthly CO2 equivalent emissions vs. targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyEmissions}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="emissions" stroke="#94C12E" strokeWidth={2} name="Actual Emissions" />
                      <Line type="monotone" dataKey="target" stroke="#1D4370" strokeWidth={2} name="Target Emissions" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">AI-Powered Insights</h2>
            <AIRecommendations />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Integration</h2>
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Data</CardTitle>
                <CardDescription>Integrate your platform with our open API for enhanced analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">By connecting your data, you can:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Access real-time sustainability metrics</li>
                  <li>Receive personalized AI-driven recommendations</li>
                  <li>Automate reporting and compliance tracking</li>
                  <li>Collaborate seamlessly with suppliers and partners</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Integrate with Open API
                </Button>
              </CardFooter>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Compliance Tracker</h2>
            <Card>
              <CardHeader>
                <CardTitle>Certification Progress</CardTitle>
                <CardDescription>Track your progress towards sustainability certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "LEED Certification", progress: 75 },
                    { name: "BREEAM Assessment", progress: 60 },
                    { name: "WELL Building Standard", progress: 40 },
                  ].map((cert, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{cert.name}</span>
                        <span>{cert.progress}%</span>
                      </div>
                      <Progress value={cert.progress} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Detailed Reports</Button>
              </CardFooter>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Sustainability Resources</h2>
            <Card>
              <CardHeader>
                <CardTitle>Latest Insights</CardTitle>
                <CardDescription>Stay updated with sustainable construction practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Webinar: Innovations in Low-Carbon Concrete", date: "June 15, 2023" },
                    { title: "Case Study: Achieving LEED Platinum in Commercial Buildings", date: "May 28, 2023" },
                    { title: "Guide: Implementing Circular Economy Principles in Construction", date: "May 10, 2023" },
                  ].map((resource, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.date}</p>
                      </div>
                      <Button variant="ghost">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Access Resource Library</Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </main>
      <SearchResultsPopup
        isOpen={showSearchResults}
        onClose={() => setShowSearchResults(false)}
        searchCriteria={searchCriteria}
      />
      <ChatbotPopup
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
      />
      <Button
        className="fixed bottom-4 right-4 rounded-full shadow-lg"
        onClick={() => setShowChatbot(true)}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Need Help?
      </Button>
    </div>
  )
}