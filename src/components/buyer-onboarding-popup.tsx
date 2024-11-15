"use client"

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BuyerOnboardingPopup({ onComplete }: { onComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(true)
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Welcome, Buyer!",
      description: "You've joined Holcim Connect as a Buyer",
      content: "Imagine you're a buyer seeking sustainable materials to meet your construction goals and compliance needs. You rely on this platform for transparent emissions data and direct access to vetted suppliers."
    },
    {
      title: "Material Search",
      description: "Find sustainable materials for your projects",
      content: "Use our advanced search features to find eco-friendly materials that meet your project specifications. Filter by sustainability metrics, certifications, and more."
    },
    {
      title: "Supplier Comparison",
      description: "Make informed decisions",
      content: "Compare multiple suppliers side-by-side, considering factors like price, sustainability ratings, and delivery times. Our platform makes it easy to choose the best option for your needs."
    },
    {
      title: "Project Management",
      description: "Track your sustainable builds",
      content: "Manage your construction projects within the platform, monitoring material usage, emissions, and progress towards sustainability goals."
    },
    {
      title: "Compliance Tracking",
      description: "Stay on top of regulations",
      content: "Access up-to-date information on sustainability regulations and certifications. Our tools help you ensure your projects meet or exceed compliance requirements."
    },
    {
      title: "Share Your Thoughts",
      description: "Help us improve the platform",
      content: "Now that you've seen the key features, we'd love to hear your thoughts! What's missing? What should we add to make this platform even more valuable for buyers like you? Please share your ideas on Mentimeter and vote for the features you think are most important. Your input will help shape the future of sustainable construction!"
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