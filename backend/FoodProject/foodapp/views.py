from django.shortcuts import render,redirect
from .models1 import Message
from .forms import MessageForm
import joblib
# Import the Python SDK
import google.generativeai as genai
# from PIL import Image
# Used to securely store your API key
genai.configure(api_key='AIzaSyCxm7u1hly5Vo0ZOMHOJgWo9__JQlfUusk')

# Create your views here.
# views.py
from django.http import JsonResponse
from .utils import predict_health_impacts
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import json

def predict_view(request):
    # Assuming you're sending data via POST request
    if request.method == 'POST':
        data = request.POST.get('formData')# Get data from request
        print(data)
        # Ensure the data is in the expected format
        input_data = [
        {
            'Age': 24,
            'Gender': 'Male',
            'Ingredient Name': 'sugary Drink',
            'Category': 'sugar',
            'Quantity Consumed': 128,
            'Frequency of Consumption': 'Weekly',
            'Processed Food': 0,
            'Cooking Method': 'Raw'
        }
        ]
        predictions = predict_health_impacts(input_data)
        return JsonResponse({
            'diabetes_impact': predictions[0].tolist(),
            'heart_disease_impact': predictions[1].tolist(),
            'hypertension_impact': predictions[2].tolist(),
        })
    
    return render(request, 'input_form.html')

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
modelRF = joblib.load('foodapp/models/random_forest_model.joblib')  # Update the path accordingly

def classify_food_view(request):
    if request.method == 'POST':
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
            "Potassium": 400.0,
            "VitaminC": 10.0,
            "VitaminE": 1.5,
            "VitaminD": 0.5
        }
        # Prepare the input for prediction
        input_data = [[
             25.0,
            15.0,
            60.0,
            300.0,
            5.0,
            100.0,
            10.0,
            200.0,
            2.5,
            400.0,
            10.0,
            1.5,
            0.5
        ]]

        # Make prediction
        prediction = modelRF.predict(input_data)

        # Process the prediction if needed (e.g., display result)
        result = prediction[0]  # Get the predicted value
        context = {'result': result}
        return render(request, 'your_template.html', context)

    return render(request, 'your_template.html')

def test(request):
    if request.method == 'GET':
        return JsonResponse({'message': "Hello"})
    
@csrf_exempt  # Disable CSRF protection for this view (only for testing, use proper CSRF tokens in production)
def quality_view(request):
    if request.method == 'POST':
        # Get the uploaded file from the request
        file = request.FILES.get('file')

        if not file:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        # Optional: Save the file using Django's default storage
        file_name = default_storage.save(file.name, ContentFile(file.read()))

        myfile = genai.upload_file(file_name)

        model = genai.GenerativeModel("gemini-1.5-flash")
        result = model.generate_content(
            [myfile, "\n\n", "Can you tell me about the ingredients in this photo and is this food is harmfull and all it contains chemicals estimate?"]
        )
        print(f"{result.text=}")
        

        # You can perform further processing on the file here (e.g., quality analysis)
        # For now, we're just returning a success message

        return JsonResponse({'message': 'File received successfully', 'file_text': result.text})
    
    # Return a method not allowed response for non-POST requests
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def chat_view(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body)
            user_message = data.get('message', '')  # Extract the user message
            
            if not user_message:
                return JsonResponse({'error': 'Message cannot be empty'}, status=400)
            
            print(f"User message: {user_message}")  # Log the user message

            # Generate response using the Gemini model
            model = genai.GenerativeModel("gemini-1.5-flash")
            result = model.generate_content(user_message)  # Pass the user message to the model
            
            # Log the generated response
            print(f"Generated response: {result.text}")

            # Return the generated response to the frontend
            return JsonResponse({'message': 'Message received', 'response': result.text})
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    elif request.method == 'GET':
        # Handle GET requests if needed
        data = request.GET.dict()
        return JsonResponse({'data': data})
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)
