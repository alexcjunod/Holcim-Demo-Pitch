"use client"

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupplierOnboardingPopup({ onComplete }: { onComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(true)
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Welcome, Supplier!",
      description: "You've joined Holcim Connect as a Supplier",
      content: "Step into the shoes of a supplier using this platform. You're here to transparently showcase your carbon emissions, highlight your certified sustainable materials, and connect with buyers prioritizing eco-friendly solutions."
    },
    {
      title: "Product Management",
      description: "Showcase your sustainable offerings",
      content: "Add and manage your eco-friendly products in the Product Management section. Highlight key sustainability metrics to attract environmentally conscious buyers."
    },
    {
      title: "Emissions Tracking",
      description: "Monitor and reduce your carbon footprint",
      content: "Use our advanced emissions tracking tools to monitor your carbon footprint across the entire production lifecycle. Identify areas for improvement and showcase your progress to potential buyers."
    },
    {
      title: "Order Management",
      description: "Streamline your order processing",
      content: "Efficiently manage incoming orders, track shipments, and communicate with buyers all in one place. Our platform makes it easy to handle increased demand for your sustainable products."
    },
    {
      title: "Analytics Dashboard",
      description: "Gain valuable insights",
      content: "Access detailed analytics about your product performance, customer preferences, and sustainability metrics. Use these insights to make data-driven decisions and grow your business."
    },
    {
      title: "Share Your Thoughts",
      description: "Help us improve the platform",
      content: "Now that you've seen the key features, we'd love to hear your thoughts! What's missing? What should we add to make this platform even more valuable for suppliers like you? Please share your ideas on Mentimeter and vote for the features you think are most important. Your input will help shape the future of sustainable construction!"
    }
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    onComplete()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{steps[step].title}</CardTitle>
          <CardDescription>{steps[step].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{steps[step].content}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClose}>
            Skip Tour
          </Button>
          <Button onClick={handleNext}>
            {step < steps.length - 1 ? 'Next' : 'Get Started'}
          </Button>
        </CardFooter>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </Card>
    </div>
  )
} 