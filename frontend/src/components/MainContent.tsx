import { useState, useEffect } from "react";
import { ImagePreview } from './ImagePreview'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"; // Assuming you want to use markdown parsing
import { LoadingSpinner } from "./ui/loading-spinner";

interface MainContentProps {
  analysisMode: "Image Analysis" | "Manual"
  selectedImage: string | null
  handleRemoveImage: () => void
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  openCamera: () => void
  cameraPermission: PermissionState | null
  markdownAnalysis: string
}

export function MainContent({
  analysisMode,
  selectedImage,
  handleRemoveImage,
  handleImageUpload,
  openCamera,
  cameraPermission,
  markdownAnalysis,
}: MainContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // New state for storing and retrieving health records from localStorage
  const [healthRecords, setHealthRecords] = useState("");

  // Load data from local storage when the component mounts
  useEffect(() => {
    const savedHealthRecords = localStorage.getItem("healthRecords");
    if (savedHealthRecords) {
      setHealthRecords(savedHealthRecords);
    }
  }, []);

  // Update local storage when healthRecords state changes
  useEffect(() => {
    localStorage.setItem("healthRecords", healthRecords);
  }, [healthRecords]);

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setShowAnalysis(false);

    const response = await fetch("http://127.0.0.1:8000/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response){
      console.log(response);
    }

    const data = await response.json();
    console.log(data);

    // Simulate analysis time (2 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setShowAnalysis(true);
    }, 2000);
  };

  return (
    <div>
      {/* Render the image preview or ingredient list based on the analysis mode */}
      {analysisMode === "Image Analysis" ? (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Image Preview</CardTitle>
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
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Ingredient List</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Textarea
              placeholder="Enter the list of ingredients..."
              className="mb-4 min-h-40"
            />
          </CardContent>
        </Card>
      )}

      {/* Render the health records textarea */}
      <h3 className="font-semibold leading-none tracking-tight mb-4">
        Previous Medical History
      </h3>
      <Textarea
        placeholder="Add Health details here..."
        value={healthRecords}
        onChange={(e) => setHealthRecords(e.target.value)}
        className="mb-4 min-h-40"
      />
      <Button className="w-full text-lg" onClick={handleRunAnalysis}>
        Run Analysis
      </Button>

      {/* Render the loading spinner while the analysis is running */}
      {isLoading && (
        <div className="flex justify-center w-full mt-4">
          <LoadingSpinner size={48} />
        </div>
      )}

      {showAnalysis && (
        <div className="mt-8 prose lg:prose-lg dark:prose-invert">
          <h2 className="font-semibold leading-none tracking-tight mb-4">
            Analysis Result
          </h2>
          <div className="p-4 bg-background border w-full rounded-lg">
            <ReactMarkdown>{markdownAnalysis}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

