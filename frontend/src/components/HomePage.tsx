import { useState, useRef, useCallback, useEffect } from 'react'
import { Header } from './Header'
import { MainContent } from './MainContent'
import { Chat } from './Chat'
import { CameraModal } from './CameraModal'

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<PermissionState | null>(null)
  const [analysisMode, setAnalysisMode] = useState<'Image Analysis' | 'Manual'>('Image Analysis')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    checkCameraPermission()
  }, [])

  const checkCameraPermission = async () => {
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'camera' as PermissionName })
      setCameraPermission(permission.state)
      permission.onchange = () => setCameraPermission(permission.state)
    }
  }

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setCameraPermission('granted')
      return true
    } catch (error) {
      console.error('Error requesting camera access:', error)
      setCameraPermission('denied')
      return false
    }
  }

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
  }

  const openCamera = async () => {
    if (cameraPermission !== 'granted') {
      const granted = await requestCameraAccess()
      if (!granted) {
        alert("Camera access is required to use this feature. Please grant permission and try again.")
        return
      }
    }

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
        await videoRef.current.play()
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

        // Stop the video stream after capturing the image
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <div className="flex-1 flex flex-col p-4">
        <Header
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          analysisMode={analysisMode}
          handleDropdownChange={(mode) => { mode === "Image Analysis" ? setAnalysisMode("Image Analysis") : setAnalysisMode("Manual") }}
        />
        <MainContent
          analysisMode={analysisMode}
          selectedImage={selectedImage}
          handleRemoveImage={handleRemoveImage}
          handleImageUpload={handleImageUpload}
          openCamera={openCamera}
          cameraPermission={cameraPermission}
        />
      </div>

      <Chat
        chatMessages={chatMessages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />

      <CameraModal
        isCameraOpen={isCameraOpen}
        onOpenChange={setIsCameraOpen}
        captureImage={captureImage}
        videoRef={videoRef}
      />

      {/* Hidden canvas for capturing image */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

