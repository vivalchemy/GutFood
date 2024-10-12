# myapp/utils.py

import joblib
import pandas as pd
import numpy as np


# Load your models
diabetes_model = joblib.load('foodapp/models/model_diabetes.joblib')
heart_disease_model = joblib.load('foodapp/models/model_heart_disease.joblib')
hypertension_model = joblib.load('foodapp/models/model_hypertension.joblib')


label_encoders = {
    'Gender': joblib.load('foodapp/models/gender_encoder.joblib'),
    'Ingredient Name': joblib.load('foodapp/models/ingredient_name_encoder.joblib'),
    'Category': joblib.load('foodapp/models/category_encoder.joblib'),
    'Frequency of Consumption': joblib.load('foodapp/models/frequency_of_consumption_encoder.joblib'),
    'Cooking Method': joblib.load('foodapp/models/cooking_method_encoder.joblib')
}


categorical_columns = ['Gender','Ingredient Name', 'Category', 'Frequency of Consumption', 'Cooking Method']

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
            new_df[col] = new_df[col].replace(label, 'Unknown')
        
        # Transform using the fitted LabelEncoder
        
        new_df[col] = label_encoders[col].transform(new_df[col].fillna('Unknown'))

    # Make predictions using the loaded models
    diabetes_pred = diabetes_model.predict(new_df)
    heart_disease_pred = heart_disease_model.predict(new_df)
    hypertension_pred = hypertension_model.predict(new_df)

    return diabetes_pred[0], heart_disease_pred[0], hypertension_pred[0]