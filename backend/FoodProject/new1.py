# Import the Python SDK
import google.generativeai as genai
# from PIL import Image
# Used to securely store your API key
genai.configure(api_key='AIzaSyCxm7u1hly5Vo0ZOMHOJgWo9__JQlfUusk')

# Load environment variables from the .env file

# Access the environment variables

myfile = genai.upload_file( "image.png")
print(f"{myfile=}")  # Update this to the path of your image file



model = genai.GenerativeModel("gemini-1.5-flash")
result = model.generate_content(
    [myfile, "\n\n", "Can you tell me about the ingredients in this photo and is this food is harmfull and all it contains chemicals estimate?"]
)
print(f"{result.text=}")


