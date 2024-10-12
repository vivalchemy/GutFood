# models/model.py
import joblib
import os
import pandas as pd

# Load models from .pkl files
def load_model(model_name):
    model_path = os.path.join(os.path.dirname(__file__), f"{model_name}.pkl")
    return joblib.load(model_path)

# Example usage
diabetes_model = load_model('diabetes_impact_model')
heart_disease_model = load_model('heart_disease_impact_model')
hypertension_model = load_model('hypertension_impact_model')
obesity_model = load_model('obesity_impact_model')





def make_prediction(model, input_data):
    # Assume input_data is a dictionary with keys matching your attributes
    input_df = pd.DataFrame([input_data])  # Convert to DataFrame for prediction
    prediction = model.predict(input_df)
    return prediction