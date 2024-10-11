import { ImagePreview } from './ImagePreview'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MainContentProps {
  analysisMode: "Image Analysis" | "Manual"
  selectedImage: string | null
  handleRemoveImage: () => void
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  openCamera: () => void
  cameraPermission: PermissionState | null
}

{/* TODO: Add recipe textarea */ }

export function MainContent({
  analysisMode,
  selectedImage,
  handleRemoveImage,
  handleImageUpload,
  openCamera,
  cameraPermission
}: MainContentProps) {
  return (
    <div>
      {analysisMode === "Image Analysis" ? (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              Image Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ImagePreview
              selectedImage={selectedImage}
              onImageRemove={handleRemoveImage}
              onImageUpload={handleImageUpload}
              openCamera={openCamera}
              cameraPermission={cameraPermission}
            />
          </CardContent>
        </Card>
      ) : (
        < Textarea placeholder="Recipe" className="mb-4 min-h-100" />
      )}
      <Textarea placeholder="Additional details..." className="mb-4" />
      <Button className="w-full text-lg">Run Analysis</Button>
    </div>
  )
}
