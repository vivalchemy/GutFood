import google.generativeai as genai
genai.configure(api_key='AIzaSyCxm7u1hly5Vo0ZOMHOJgWo9__JQlfUusk')
# Generation configuration
generation_config = {
    "temperature": 0.7,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

# Safety settings
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

# Initialize the model and start the chat
model = genai.GenerativeModel(
    "gemini-1.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
)
convo = model.start_chat()

# System message to instruct the model
system_message = """INSTRUCTIONS: Respond as a helpful and informative voice assistant. Use short sentences and directly address the prompt without excessive information. Generate only words of value, prioritizing logic and facts over speculating.
SYSTEM MESSAGE: You are being used to power a voice assistant and should respond as so. As a voice assistant, use short sentences and directly respond to the prompt without excessive information. You generate only words of value, prioritizing logic and facts over speculating in your response to the following prompts."""

convo.send_message(system_message)

# Function to process user input and send it to the model
def process_input():
    user_input = input("Enter the message: ")  # Capture speech input
    if user_input:
        convo.send_message(user_input)  # Send the user input to the model
        response_text = convo.last.text  # Get the model's response
        print(response_text)  # Print the response

        if "exit" in response_text.lower():
            print("Exiting program...")
            return False
    return True

def main():
    while True:
        # Process the input when spacebar is pressed and released
        if not process_input():
            break  # Exit the loop if "exit" is detected

if __name__ == "_main_":
    main()