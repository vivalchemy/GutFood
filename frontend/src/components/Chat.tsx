import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send } from 'lucide-react'

interface ChatProps {
  chatMessages: string[]
  inputMessage: string
  setInputMessage: (message: string) => void
  handleSendMessage: () => void
  isChatOpen: boolean
  setIsChatOpen: (open: boolean) => void
}

export function Chat({
  chatMessages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isChatOpen,
  setIsChatOpen
}: ChatProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={`md:block ${isChatOpen ? 'block' : 'hidden md:flex'} absolute md:static inset-0 bg-background z-50 md:w-1/3 lg:w-2/5`}>
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl">Chat</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsChatOpen(false)}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          {chatMessages.map((message, index) => (
            <div key={index} className="mb-3 p-3 bg-muted rounded-lg text-sm">{message}</div>
          ))}
        </CardContent>
        <div className="p-4 flex">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 mr-3 p-6"
          />
          <Button onClick={handleSendMessage} size="lg">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
