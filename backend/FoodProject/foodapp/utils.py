# myapp/utils.py

import os

# Import the Python SDK
import google.generativeai as genai
import joblib
import numpy as np
import pandas as pd

# Used to securely store your API key


# Load environment variables from the .env file

# Load your models
diabetes_model = joblib.load("foodapp/models/model_diabetes.joblib")
heart_disease_model = joblib.load("foodapp/models/model_heart_disease.joblib")
hypertension_model = joblib.load("foodapp/models/model_hypertension.joblib")


label_encoders = {
    "Gender": joblib.load("foodapp/models/gender_encoder.joblib"),
    "Ingredient Name": joblib.load("foodapp/models/ingredient_name_encoder.joblib"),
    "Category": joblib.load("foodapp/models/category_encoder.joblib"),
    "Frequency of Consumption": joblib.load(
        "foodapp/models/frequency_of_consumption_encoder.joblib"
    ),
    "Cooking Method": joblib.load("foodapp/models/cooking_method_encoder.joblib"),
}


categorical_columns = [
    "Gender",
    "Ingredient Name",
    "Category",
    "Frequency of Consumption",
    "Cooking Method",
]


# Access the environment variables
genai.configure(api_key="AIzaSyBbKKDaSLShaFl9ZeT3DACxAz5w0c5fJzU")

generation_config = {
    "temperature": 0.7,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

# Safety settings for content generation
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

model = genai.GenerativeModel(
    "gemini-1.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
)
convo = model.start_chat()


def predict_health_impacts(new_data):
    # Create a DataFrame for the new data

    new_df = pd.DataFrame(new_data)

    for col in categorical_columns:
        new_df[col] = new_df[col].str.title()
    # Preprocess the input data (make sure to apply the same preprocessing steps)
    print("Input DataFrame:")
    print(new_df)
    for col in categorical_columns:
        unseen_labels = set(new_df[col]) - set(label_encoders[col].classes_)

        # Replace each unseen label with 'Unknown'
        for label in unseen_labels:
            new_df[col] = new_df[col].replace(label, "Unknown")

        # Transform using the fitted LabelEncoder

        new_df[col] = label_encoders[col].transform(new_df[col].fillna("Unknown"))

    # Make predictions using the loaded models
    diabetes_pred = diabetes_model.predict(new_df)
    heart_disease_pred = heart_disease_model.predict(new_df)
    hypertension_pred = hypertension_model.predict(new_df)

    return diabetes_pred[0], heart_disease_pred[0], hypertension_pred[0]


def init_convo(food_details):
    system_prompt = """
You are a professional and certified nutritionist. You will be provided with information about a food item or data related to food. A user will then ask you questions about it. 

Respond to the user in the style of a knowledgeable doctor, providing accurate and relevant health and nutritional information only. Avoid using informal language and focus on providing evidence-based advice. 
"""

    print("System prompt:", system_prompt + food_details)
    # Send the system prompt to the conversation
    convo.send_message(system_prompt.strip() + food_details)


def ask_question(user_input):
    response = convo.send_message(user_input)
    return response
