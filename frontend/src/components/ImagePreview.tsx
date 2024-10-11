import { useRef, useState, ChangeEvent, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Upload, X, Camera } from 'lucide-react'

interface ImagePreviewProps {
  selectedImage: string | null
  onImageRemove: () => void
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void
  openCamera: () => void
  cameraPermission: PermissionState | null
}

export function ImagePreview({
  selectedImage,
  onImageRemove,
  onImageUpload,
  openCamera,
  cameraPermission
}: ImagePreviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect if the user is on a mobile device
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = window.navigator.userAgent
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)
      setIsMobile(isMobileDevice)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  return (
    <div className='w-[70%]'>
      {selectedImage ? (
        <div className="relative w-full h-full">
          <img src={selectedImage} alt="Uploaded" className="w-full h-full object-contain" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onImageRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
          <div className="aspect-square">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-full flex flex-col items-center justify-center text-foreground hover:bg-muted bg-background"
            >
              <Upload className="h-12 sm:h-16 md:h-24 w-12 sm:w-16 md:w-24 mb-2" />
              <span className='text-md sm:text-xl md:text-2xl'>Upload Image</span>
            </Button>
            <input
              type="file"
              className="hidden"
              onChange={onImageUpload}
              ref={fileInputRef}
              accept="image/*"
            />
          </div>

          {!isMobile && (  // Hide the Open Camera button on mobile devices
            <div className="aspect-square">
              <Button
                onClick={openCamera}
                className="w-full h-full flex flex-col items-center justify-center text-foreground hover:bg-muted bg-background"
              >
                <Camera className="h-12 sm:h-16 md:h-24 w-12 sm:w-16 md:w-24 mb-2" />
                <span className='text-md sm:text-xl md:text-2xl'>Open Camera</span>
                {cameraPermission && (
                  <span className={`text-xs mt-2 ${cameraPermission !== 'granted' && 'text-red-500'}`}>
                    {cameraPermission !== 'granted' && 'Access Denied'}
                  </span>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

