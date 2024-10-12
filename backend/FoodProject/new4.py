import numpy as np
import pandas as pd
import google.generativeai as genai
# from PIL import Image
# Used to securely store your API key
genai.configure(api_key='AIzaSyCxm7u1hly5Vo0ZOMHOJgWo9__JQlfUusk')

# Step 1: Generate dataset
data = {
    'Age': np.random.randint(30, 70, size=10),
    'Gender': np.random.choice(['Male', 'Female'], size=10),
    'Ingredient Name': np.random.choice(
        ['Olive Oil', 'Chicken', 'Rice', 'Broccoli', 'Potato', 'Cheese', 'Bread', 'Fish', 'Beef', 'Pasta'],
        size=10
    ),
    'Category': np.random.choice(
        ['Fats', 'Proteins', 'Carbohydrates', 'Vegetables', 'Dairy'],
        size=10
    ),
    'Quantity Consumed': np.random.uniform(1, 100, size=10),
    'Frequency of Consumption': np.random.choice(['Daily', 'Weekly', 'Monthly'], size=10),
    'Processed Food': np.random.choice([0, 1], size=10),
    'Cooking Method': np.random.choice(['Frying', 'Boiling', 'Grilling', 'Baking'], size=10),
}

df = pd.DataFrame(data)

# Step 2: Create the prompt for GenAI to fill the remaining values
def create_prompt(row):
    prompt = (
        f"Age: {row['Age']}, "
        f"Gender: {row['Gender']}, "
        f"Ingredient: {row['Ingredient Name']}, "
        f"Category: {row['Category']}, "
        f"Frequency: {row['Frequency of Consumption']}, "
        f"Method: {row['Cooking Method']}. "
        f"Fill in missing values if any, and ensure the format is correct. if not able to give proper value put random values to it"
    )
    return prompt

# Step 3: Use GenAI to fill and validate data
def validate_and_fill(row):
    prompt = create_prompt(row)
    model = genai.GenerativeModel("gemini-1.5-flash")
    result = model.generate_content(prompt)
    print(prompt)
    # Process response to get the cleaned or filled data
    return result.text

# Apply validation to the dataset
df['validated_data'] = df.apply(validate_and_fill, axis=1)

# Step 4: Check for inconsistencies in the format
def check_format(row):
    # Example: Ensuring 'Age' is within a valid range
    if row['Age'] < 0 or row['Age'] > 120:
        row['Age'] = np.nan  # or set a valid default
    # Add other format checks as needed
    return row

df = df.apply(check_format, axis=1)

# Output the final dataframe
print(df['validated_data'])
