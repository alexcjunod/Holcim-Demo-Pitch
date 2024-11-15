"use client"

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrchestratorOnboardingPopup({ onComplete }: { onComplete: () => void }) {
  const [isOpen, setIsOpen] = useState(true)
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Welcome, Orchestrator!",
      description: "You've joined Holcim Connect as an Orchestrator",
      content: "Take on the role of the orchestrator managing this platform. You're responsible for enabling collaboration between suppliers and buyers while maintaining transparency and trust."
    },
    {
      title: "Platform Overview",
      description: "Monitor overall platform activity",
      content: "Get a bird's-eye view of all platform activities, including user growth, transaction volume, and sustainability impact. Identify trends and areas needing attention."
    },
    {
      title: "User Management",
      description: "Oversee supplier and buyer accounts",
      content: "Manage user accounts, verify credentials, and ensure compliance with platform policies. Maintain the integrity of the ecosystem by vetting participants."
    },
    {
      title: "Data Validation",
      description: "Ensure data accuracy and reliability",
      content: "Use our advanced tools to validate emissions data, certifications, and other critical information shared on the platform. Maintain trust through data integrity."
    },
    {
      title: "Dispute Resolution",
      description: "Facilitate smooth transactions",
      content: "Access tools to mediate disputes between suppliers and buyers, ensuring fair and transparent resolution processes that maintain platform trust."
    },
    {
      title: "Share Your Thoughts",
      description: "Help us improve the platform",
      content: "Now that you've seen the key features, we'd love to hear your thoughts! What's missing? What should we add to make this platform even more valuable for orchestrators like you? Please share your ideas on Mentimeter and vote for the features you think are most important. Your input will help shape the future of sustainable construction!"
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