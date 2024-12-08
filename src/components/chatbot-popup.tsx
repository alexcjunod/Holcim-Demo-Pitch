"use client"

import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatbotPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatbotPopup({ isOpen, onClose }: ChatbotPopupProps) {
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
          className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50"
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