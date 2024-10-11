import { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CameraModalProps {
  isCameraOpen: boolean
  onOpenChange: (open: boolean) => void
  captureImage: () => void
  videoRef: React.RefObject<HTMLVideoElement>
}

export function CameraModal({
  isCameraOpen,
  onOpenChange,
  captureImage,
  videoRef
}: CameraModalProps) {

  useEffect(() => {
    const handleSpacebarPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        captureImage()
      }
    }

    if (isCameraOpen) {
      document.addEventListener('keydown', handleSpacebarPress)
    } else {
      document.removeEventListener('keydown', handleSpacebarPress)
    }

    return () => {
      document.removeEventListener('keydown', handleSpacebarPress)
    }
  }, [isCameraOpen, captureImage])

  return (
    <Dialog open={isCameraOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Camera</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full">
          <video ref={videoRef} className="w-full h-full" />
        </div>
        <Button onClick={captureImage} className="w-full mt-4">
          Capture Image (or press Space)
        </Button>
      </DialogContent>
    </Dialog>
  )
}

