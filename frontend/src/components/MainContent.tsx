import { useState } from "react";
import { ImagePreview } from './ImagePreview';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import ReactMarkdown from "react-markdown";
import { LoadingSpinner } from "./ui/loading-spinner";
import { Chart } from './Chart'; // Import the AnalysisChart component

interface MainContentProps {
  analysisMode: "Image Analysis" | "Manual";
  selectedImage: string | null;
  handleRemoveImage: () => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openCamera: () => void;
  cameraPermission: PermissionState | null;
  markdownAnalysis: string;
  handleSubmitForm: (formData: any) => void; // Function to submit the form data
}

export function MainContent({
  analysisMode,
  selectedImage,
  handleRemoveImage,
  handleImageUpload,
  openCamera,
  cameraPermission,
  markdownAnalysis,
  handleSubmitForm,
}: MainContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [quantityConsumed, setQuantityConsumed] = useState("");
  const [frequency, setFrequency] = useState("");
  const [cookingMethod, setCookingMethod] = useState("");
  const [additionalParams, setAdditionalParams] = useState("");

  // Health parameters
  const [diabetes, setDiabetes] = useState(0);
  const [heartDisease, setHeartDisease] = useState(0);
  const [hypertension, setHypertension] = useState(0);
  const [qualityOfFood, setQualityOfFood] = useState(0);
  const [calories, setCalories] = useState(0);

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setShowAnalysis(false);

    const formData = {
      age,
      gender,
      quantityConsumed,
      frequency,
      cookingMethod,
      additionalParams,
    };

    console.log(formData);
    
    try {
      // Replace with your backend API endpoint
      const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data to the backend');
      }
  
      const data = await response.json();
      console.log('Backend response:', data);  

      // Extract data from the backend response for chart
      setDiabetes(data.diabetes_impact);
      setHeartDisease(data.heart_disease_impact);
      setHypertension(data.hypertension_impact);
      setQualityOfFood(data.qualityOfFood);
      setCalories(data.calary);

      setTimeout(() => {
        setIsLoading(false);
        setShowAnalysis(true);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };


  return (
    <div>
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

      {/* Nutritional Information Form */}
      <h3 className="font-semibold leading-none tracking-tight mb-4">
        Nutritional Information Form
      </h3>

      {/* Flex container for age and gender */}
      <div className="flex gap-4 mb-4">
        {/* Age Input */}
        <div className="flex-1">
          <label className="block font-semibold mb-2">Age</label>
          <Input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Gender Select */}
        <div className="flex-1">
          <label className="block font-semibold mb-2">Gender</label>
          <Select onValueChange={setGender} defaultValue="">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Flex container for quantity and frequency */}
      <div className="flex gap-4 mb-4">
        {/* Quantity Consumed Input */}
        <div className="flex-1">
          <label className="block font-semibold mb-2">Quantity Consumed (grams)</label>
          <Input
            type="number"
            placeholder="Enter quantity"
            value={quantityConsumed}
            onChange={(e) => setQuantityConsumed(e.target.value)}
          />
        </div>

        {/* Frequency of Consumption Select */}
        <div className="flex-1">
          <label className="block font-semibold mb-2">Frequency of Consumption</label>
          <Select onValueChange={setFrequency} defaultValue="">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cooking Method Select */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Cooking Method</label>
        <Select onValueChange={setCookingMethod} defaultValue="">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Cooking Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Raw">Raw</SelectItem>
            <SelectItem value="Frying">Frying</SelectItem>
            <SelectItem value="Boiling">Boiling</SelectItem>
            <SelectItem value="Grilling">Grilling</SelectItem>
            <SelectItem value="Baking">Baking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Parameters Textarea */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Additional Parameters</label>
        <Textarea
          placeholder="Add any additional information... Eg: Medical history, allergies, or dietary restrictions."
          value={additionalParams}
          onChange={(e) => setAdditionalParams(e.target.value)}
          className="mb-4 min-h-40"
        />

      </div>

      {/* Run Analysis Button */}
      <Button className="w-full text-lg" onClick={handleRunAnalysis}>
        Run Analysis
      </Button>

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

          {/* Display the AnalysisChart */}
          <Chart 
            diabetes={diabetes}
            heartDisease={heartDisease}
            hypertension={hypertension}
            qualityOfFood={qualityOfFood}
            calories={calories}
          />
        </div>
      )}
    </div>
  );
}
