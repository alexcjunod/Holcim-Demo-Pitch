"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Building, ShoppingCart, Truck, Settings, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SupplierOnboardingPopup from "@/components/supplier-onboarding-popup"
import BuyerOnboardingPopup from "@/components/buyer-onboarding-popup"
import OrchestratorOnboardingPopup from "@/components/orchestrator-onboarding-popup"

export default function Home() {
  const [showSupplierOnboarding, setShowSupplierOnboarding] = useState(false)
  const [showBuyerOnboarding, setShowBuyerOnboarding] = useState(false)
  const [showOrchestratorOnboarding, setShowOrchestratorOnboarding] = useState(false)
  const [showLogisticsOnboarding, setShowLogisticsOnboarding] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-[#1D4370] to-[#94C12E]">
      <div className="w-full max-w-5xl text-center">
        <Image
          src="/Holcim_idvoMN9469_6.png"
          alt="Holcim Logo"
          width={100}
          height={100}
          className="mx-auto mb-8"
          priority
        />
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Holcim Connect</h1>
        <p className="text-xl mb-12 text-gray-200">
          Your sustainable construction hub connecting suppliers and buyers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Button 
            size="lg" 
            className="bg-white text-[#1D4370] hover:bg-gray-100 w-full"
            onClick={() => setShowSupplierOnboarding(true)}
          >
            <Building className="mr-2 h-5 w-5" />
            I&apos;m a Supplier
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button 
            size="lg" 
            className="bg-[#94C12E] text-white hover:bg-[#7da726] w-full"
            onClick={() => setShowBuyerOnboarding(true)}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            I&apos;m a Buyer
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button 
            size="lg" 
            className="bg-white text-[#1D4370] hover:bg-gray-100 w-full"
            onClick={() => setShowLogisticsOnboarding(true)}
          >
            <Truck className="mr-2 h-5 w-5" />
            I&apos;m a Logistics Provider
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button 
            size="lg" 
            className="bg-[#94C12E] text-white hover:bg-[#7da726] w-full"
            onClick={() => setShowOrchestratorOnboarding(true)}
          >
            <Settings className="mr-2 h-5 w-5" />
            I&apos;m an Orchestrator
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {showSupplierOnboarding && (
        <SupplierOnboardingPopup 
          onComplete={() => {
            setShowSupplierOnboarding(false)
            window.location.href = '/supplier'
          }} 
        />
      )}

      {showBuyerOnboarding && (
        <BuyerOnboardingPopup 
          onComplete={() => {
            setShowBuyerOnboarding(false)
            window.location.href = '/consumer'
          }} 
        />
      )}

      {showOrchestratorOnboarding && (
        <OrchestratorOnboardingPopup 
          onComplete={() => {
            setShowOrchestratorOnboarding(false)
            window.location.href = '/orchestrator'
          }} 
        />
      )}
    </main>
  )
}
