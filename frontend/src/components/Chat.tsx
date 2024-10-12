import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Send } from 'lucide-react';
import ReactMarkdown from "react-markdown"; // Assuming you want to use markdown parsing

interface ChatProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

export function Chat({
  inputMessage,
  setInputMessage,
  isChatOpen,
  setIsChatOpen
}: ChatProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      // Add user's message to chatMessages
      const userMessage: ChatMessage = { sender: 'user', message: inputMessage };
      setChatMessages([...chatMessages, userMessage]);
      console.log('User message added:', userMessage);

      // Send message to backend
      try {
        const response = await fetch('http://127.0.0.1:8000/chat/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.response);

          // Add bot's response to chatMessages
          const botMessage: ChatMessage = { sender: 'bot', message: data.response };
          setChatMessages((prevMessages) => [...prevMessages, botMessage]);
          console.log('Bot message added:', botMessage);
        } else {
          console.error('Failed to send message to backend', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message to backend:', error);
      }

      // Clear the input field
      setInputMessage('');
    }
  };

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
          {chatMessages.map((chatMessage, index) => (
            <div
              key={index}
              className={`mb-3 p-3 rounded-lg text-sm ${chatMessage.sender === 'user'
                ? 'bg-primary text-right ml-auto'
                : 'bg-muted text-left'
                }`}
              style={{
                maxWidth: 'max-content', // Adjust the width to max-content
                wordWrap: 'break-word' // Ensure that long words break if necessary
              }}
            >

              <div className="flex flex-col items-start">
                <p>{chatMessage.sender}</p>
                <ReactMarkdown>{chatMessage.message}</ReactMarkdown>
              </div>
            </div>
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
  );
}

