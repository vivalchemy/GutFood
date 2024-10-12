# Import the Python SDK
# Import the Python SDK
import json
import pandas as pd
import google.generativeai as genai
import joblib
import numpy as np
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

# Create your views here.
# views.py
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt

from .forms import MessageForm
from .models1 import Message
from .utils import ask_question, init_convo, predict_health_impacts

# from PIL import Image
# Used to securely store your API key
genai.configure(api_key="AIzaSyCxm7u1hly5Vo0ZOMHOJgWo9__JQlfUusk")


modelQl = joblib.load(
    "foodapp/models/quality_prediction.joblib"
) 

@csrf_exempt
def predict_view(request):
    # Assuming you're sending data via POST request
    if request.method == "POST":
        form_data = json.loads(request.body.decode("utf-8"))

        # Print the received formData to the console
        print("Received formData:", form_data["age"])
        # Ensure the data is in the expected format
        input_data = [
            {
                "Age": form_data["age"],
                "Gender": form_data["gender"],
                "Ingredient Name": "Sugar",
                "Category": "sugar",
                "Quantity Consumed": form_data["quantityConsumed"],
                "Frequency of Consumption": form_data["frequency"],
                "Processed Food": 0,
                "Cooking Method": form_data["cookingMethod"],
            }
        ]
        # calory
        # Initialize the Generative Model
        model = genai.GenerativeModel("gemini-1.5-flash")
        # Generate content using the model
        response = model.generate_content(
            "Please provide a JSON object with the following nutrient values for a random food item: "
            '{"Protein": 25.0, "TotalFat": 15.0, "Carbohydrate": 60.0, '
            '"Sodium": 300.0, "SaturatedFat": 5.0, "Cholesterol": 100.0, '
            '"Sugar": 10.0, "Calcium": 200.0, "Iron": 2.5, "Potassium": 400.0, '
            '"VitaminC": 10.0, "VitaminE": 1.5, "VitaminD": 0.5}. '
            "Ensure the output is a valid JSON object without any additional text."
        )
        # Print the raw response to debug
        print("Raw Response:", response.text)
        # Check if the response is empty or not
        if (
            not response.text.strip()
        ):  # Checks if the response is empty or contains only whitespace
            print("Received an empty response. Cannot parse JSON.")
        else:
            try:
                # Parse the JSON response
                response1 = json.loads(response.text)
                print("Parsed JSON:", response1)

                # Extract values into a list
                input_data1 = list(response1.values())
                print("Input Data:", input_data1)

                # Reshape the input data to 2D array (1 sample, n features)
                input_data1_reshaped = np.array(input_data1).reshape(1, -1)
                print("Reshaped Input Data:", input_data1_reshaped)

                # Make a prediction using the modelRF
                prediction1 = modelRF.predict(input_data1_reshaped)

                # Process the prediction (e.g., get the first predicted value)
                result = prediction1[0]  # Get the predicted value
                context = {"result": result}
                print("Prediction Result:", context)

            except json.JSONDecodeError as e:
                print("Error decoding JSON:", e)  # Output any JSON decode errors
            except Exception as e:
                print("An error occurred:", e)  # Catch any other exceptions
        print("Prediction Result:", context)

        # quality
        responseq = model.generate_content(
            "Please provide a JSON object with the following nutrient values for a random food item: "
            '{"fixed_acidity": 7.65, "volatile_acidity": 0.44, "citric_acid": 0.42, "residual_sugar": 1.22, '
            '"chlorides": 0.05, "free_sulfur_dioxide": 24, "total_sulfur_dioxide": 56, "density": 0.99532, '
            '"pH": 3.19, "sulphates": 0.82, "alcohol": 12.4} '
            "Ensure the output is a valid JSON object without any additional text."
        )

        # Print the raw response to debug
        print("Raw Response:", responseq.text)
        # Check if the response is empty or not
        if (
            not responseq.text.strip()
        ):  # Checks if the response is empty or contains only whitespace
            print("Received an empty response. Cannot parse JSON.")
        else:
            try:
                # Parse the JSON response
                response1q = json.loads(responseq.text)
                print("Parsed JSON:", response1q)

                # Extract values into a list
                input_data1q = list(response1q.values())
                print("Input Data:", input_data1q)

                # Reshape the input data to 2D array (1 sample, n features)
                input_data1_reshapedq = np.array(input_data1q).reshape(1, -1)
                print("Reshaped Input Data:", input_data1_reshapedq)

                # Make a prediction using the modelRF
                prediction1q = modelQl.predict(input_data1_reshapedq)

                # Process the prediction (e.g., get the first predicted value)
                resultq = prediction1q[0].item()  # Get the predicted value
                contextq = {"result": resultq}
                

            except json.JSONDecodeError as e:
                print("Error decoding JSON:", e)  # Output any JSON decode errors
            except Exception as e:
                print("An error occurred:", e)  # Catch any other exceptions


        print("Prediction Result:", context)
        print("Prediction Result:", contextq)

        predictions = predict_health_impacts(input_data)

        return JsonResponse(
            {
                "diabetes_impact": predictions[0].tolist(),
                "heart_disease_impact": predictions[1].tolist(),
                "hypertension_impact": predictions[2].tolist(),
                "calary": context["result"],
                "quality": contextq["result"]
            }
        )

    return render(request, "input_form.html")
    #
    #     return JsonResponse({
    #         'diabetes_impact': predictions[0].tolist(),
    #         'heart_disease_impact': predictions[1].tolist(),
    #         'hypertension_impact': predictions[2].tolist(),
    #     })
    #
    # return render(request, 'input_form.html')
    #     return JsonResponse(
    #         {
    #             "diabetes_impact": predictions[0].tolist(),
    #             "heart_disease_impact": predictions[1].tolist(),
    #             "hypertension_impact": predictions[2].tolist(),
    #         }
    #     )
    #
    # return render(request, "input_form.html")


# gemini = Gemini(api_key='AIzaSyCxm7u1hly5Vo0ZOMHOJgWo9__JQlfUusk')

# chat
# def chat_view(request):
#     if request.method == 'POST':
#         form = MessageForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('chat')

#     messages = Message.objects.all().order_by('-timestamp')
#     form = MessageForm()
#     return render(request, 'chat/chat.html', {'form': form, 'messages': messages})

# def chat_api_view(request):
#     if request.method == 'POST':
#         data = request.POST
#         # response = gemini.chat.send_message(data['username'], data['content'])
#         return JsonResponse(response)


# Colories Data prediction
# Load the model
modelRF = joblib.load(
    "foodapp/models/random_forest_model.joblib"
)  # Update the path accordingly


def classify_food_view(request):
    if request.method == "POST":
        # Retrieve input values from the form
        # protein = float(request.POST.get('protein', 0))
        # total_fat = float(request.POST.get('total_fat', 0))
        # carbohydrate = float(request.POST.get('carbohydrate', 0))
        # sodium = float(request.POST.get('sodium', 0))
        # saturated_fat = float(request.POST.get('saturated_fat', 0))
        # cholesterol = float(request.POST.get('cholesterol', 0))
        # sugar = float(request.POST.get('sugar', 0))
        # calcium = float(request.POST.get('calcium', 0))
        # iron = float(request.POST.get('iron', 0))
        # potassium = float(request.POST.get('potassium', 0))
        # vitamin_c = float(request.POST.get('vitamin_c', 0))
        # vitamin_e = float(request.POST.get('vitamin_e', 0))
        # vitamin_d = float(request.POST.get('vitamin_d', 0))

        {
            "Protein": 25.0,
            "TotalFat": 15.0,
            "Carbohydrate": 60.0,
            "Sodium": 300.0,
            "SaturatedFat": 5.0,
            "Cholesterol": 100.0,
            "Sugar": 10.0,
            "Calcium": 200.0,
            "Iron": 2.5,
            "Potassium": 900.0,
            "VitaminC": 10.0,
            "VitaminE": 1.5,
            "VitaminD": 0.5,
        }
        feature_names = [
            'Protein', 'TotalFat', 'Carbohydrate', 'Sodium', 'SaturatedFat', 
            'Cholesterol', 'Sugar', 'Calcium', 'Iron', 'Potassium', 
            'VitaminC', 'VitaminE', 'VitaminD'
        ]

        # Create a DataFrame with the same feature names for predictions
        input_data = pd.DataFrame({
            'Protein': [25.0],
            'TotalFat': [15.0],
            'Carbohydrate': [40.0],
            'Sodium': [300.0],
            'SaturatedFat': [5.0],
            'Cholesterol': [900.0],
            'Sugar': [10.0],
            'Calcium': [200.0],
            'Iron': [2.5],
            'Potassium': [900.0],
            'VitaminC': [10.0],
            'VitaminE': [1.5],
            'VitaminD': [0.5]
        }, columns=feature_names)
        # Make prediction
        prediction = modelRF.predict(input_data)

        # Process the prediction if needed (e.g., display result)
        result = prediction[0]  # Get the predicted value
        context = {"result": result}
        return render(request, "your_template.html", context)

    return render(request, "your_template.html")


def test(request):
    if request.method == "GET":
        return JsonResponse({"message": "Hello"})


@csrf_exempt  # Disable CSRF protection for this view (only for testing, use proper CSRF tokens in production)
def quality_view(request):
    if request.method == "POST":
        # Get the uploaded file from the request
        file = request.FILES.get("file")

        if not file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        # Optional: Save the file using Django's default storage
        file_name = default_storage.save(file.name, ContentFile(file.read()))

        myfile = genai.upload_file(file_name)

        model = genai.GenerativeModel("gemini-1.5-flash")
        result = model.generate_content(
            [
                myfile,
                "\n\n",
                "Given an image of food, please provide a detailed analysis considering the following:1. **Ingredients:** List all visible ingredients as specifically as possible. For example, instead of bread,identify the type of bread like whole wheat sourdough or white hamburger bun. 2. **Nutritional Value:** Based on the visible ingredients, discuss the potential nutritional value of the food. Mention potential vitamins, minerals, protein, fiber, etc. 3. **Potential Health Concerns:**  * **Unhealthy Ingredients:** Identify any ingredients that might be considered unhealthy and explain why. Consider aspects like high saturated fat, added sugar, processed ingredients, sodium content, etc. * **Chemicals of Concern:** While all food contains chemicals, are there any ingredients that might raise concern due to potential additives or processing methods? Explain your reasoning.4. **Label Insights:** Are there any labels or branding visible in the image? If so, what information do they provide about the food's ingredients, nutritional content, or origin?5. **Healthier Alternatives:** Suggest specific, healthier alternatives to ingredients or preparation methods used in the dish. For example, could a different type of oil be used, or could a certain ingredient be substituted for a less processed option? **Please provide your analysis based solely on the visual information present in the image.  Do not speculate about ingredients or preparations not visible in the image.** ",
            ]
        )
        print(f"the result is {result.text=}")

        init_convo(result.text)
        # You can perform further processing on the file here (e.g., quality analysis)
        # For now, we're just returning a success message

        return JsonResponse(
            {"message": "File received successfully", "file_text": result.text}
        )

    # Return a method not allowed response for non-POST requests
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def chat_view(request):
    if request.method == "POST":
        try:
            # Parse JSON data
            data = json.loads(request.body)
            user_message = data.get("message", "")  # Extract the user message

            if not user_message:
                return JsonResponse({"error": "Message cannot be empty"}, status=400)

            print(f"User message: {user_message}")  # Log the user message

            # Generate response using the Gemini model

            result = ask_question(user_message)  # Pass the user message to the model

            # Log the generated response
            print(f"Generated response: {result.text}")

            # Return the generated response to the frontend
            return JsonResponse(
                {"message": "Message received", "response": result.text}
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    elif request.method == "GET":
        # Handle GET requests if needed
        data = request.GET.dict()
        return JsonResponse({"data": data})

    return JsonResponse({"error": "Invalid request method"}, status=405)
