import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building, ShoppingCart, Truck, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-[#1D4370] to-[#94C12E]">
      <div className="w-full max-w-5xl text-center">
        <Image
          src="/Holcim_idvoMN9469_6.png"
          alt="Holcim Logo"
          width={100}
          height={100}
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Holcim Connect</h1>
        <p className="text-xl mb-12 text-gray-200">
          Your sustainable construction hub connecting suppliers and buyers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link href="/supplier" className="w-full">
            <Button size="lg" className="bg-white text-[#1D4370] hover:bg-gray-100 w-full">
              <Building className="mr-2 h-5 w-5" />
              I'm a Supplier
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/consumer" className="w-full">
            <Button size="lg" className="bg-[#94C12E] text-white hover:bg-[#7da726] w-full">
              <ShoppingCart className="mr-2 h-5 w-5" />
              I'm a Buyer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/logistics" className="w-full">
            <Button size="lg" className="bg-white text-[#1D4370] hover:bg-gray-100 w-full">
              <Truck className="mr-2 h-5 w-5" />
              I'm a Logistics Provider
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/orchestrator" className="w-full">
            <Button size="lg" className="bg-[#94C12E] text-white hover:bg-[#7da726] w-full">
              <Settings className="mr-2 h-5 w-5" />
              I'm an Orchestrator
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
