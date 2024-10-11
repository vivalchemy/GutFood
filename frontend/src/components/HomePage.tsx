import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ModeToggle } from "@/components/mode-toggle"
import { Camera, Send, Upload, X, MessageSquare } from 'lucide-react'

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false) // State to manage chat UI visibility on mobile
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, inputMessage])
      setInputMessage('')
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openCamera = async () => {
    setIsCameraOpen(true)
    try {
      const constraints = {
        video: {
          facingMode: 'environment'
        }
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play() // Ensure video is playing before capturing
      }
    } catch (err) {
      console.error("Error accessing the camera", err)
      alert("Failed to access the camera. Please make sure you've granted the necessary permissions.")
    }
  }

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0)
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
        setSelectedImage(imageDataUrl)
        setIsCameraOpen(false)
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && isCameraOpen) {
        captureImage()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isCameraOpen, captureImage])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Image Analysis</h1>
          <div className="flex space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="md:hidden"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Image Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {selectedImage ? (
              <div className="relative w-full h-full">
                <img src={selectedImage} alt="Uploaded" className="w-full h-full object-contain" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 p-4 w-full">
                <div className="aspect-square">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center text-foreground hover:bg-muted bg-background"
                  >
                    <Upload className="h-16 md:h-24 w-16 md:w-24 mb-2" />
                    <span className='text-md sm:text-xl md:text-2xl'>Upload Image</span>
                  </Button>
                </div>
                <div className="aspect-square">
                  <Button
                    onClick={openCamera}
                    className="w-full h-full flex flex-col items-center justify-center text-foreground hover:bg-muted bg-background"
                  >
                    <Camera className="h-16 md:h-24 w-16 md:w-24 mb-2" />
                    <span className='text-md sm:text-xl md:text-2xl'>Open Camera</span>
                  </Button>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  accept="image/*"
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Textarea placeholder="Additional details..." className="mb-4" />
        <Button className="w-full">Run Analysis</Button>
      </div>

      {/* Chat UI */}
      <div className={`md:block ${isChatOpen ? 'block' : 'hidden md:flex'} absolute md:static inset-0 bg-background z-50`}>
        <Card className="w-full h-full flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Chat</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(false)}
              className="md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {chatMessages.map((message, index) => (
              <div key={index} className="mb-2 p-2 bg-muted rounded">{message}</div>
            ))}
          </CardContent>
          <div className="p-4 border-t flex">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 mr-2"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Camera Dialog */}
      <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Camera</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <video ref={videoRef} autoPlay playsInline className="w-full" />
            <canvas ref={canvasRef} className="hidden" />
            <Button onClick={captureImage} className="mt-4 w-full">
              Capture Image (or press Spacebar)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

