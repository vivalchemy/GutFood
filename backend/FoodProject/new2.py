import easyocr
import matplotlib.pyplot as plt
import cv2

# Create an EasyOCR reader
reader = easyocr.Reader(['en'])  # Specify the languages you want to recognize

# Load the image
def load_image(image_path):
    return cv2.imread(image_path)

# Perform OCR on the image
def perform_ocr(image):
    # Use EasyOCR to get the predictions
    results = reader.readtext(image)
    return results

# Visualize the results
# Visualize the results
def visualize_results(image, predictions):
    plt.figure(figsize=(10, 10))
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    # Draw the detected text boxes and recognized text
    for (bbox, text, prob) in predictions:
        # Draw the bounding box
        (top_left, top_right, bottom_right, bottom_left) = bbox
        top_left = tuple(map(int, top_left))
        bottom_right = tuple(map(int, bottom_right))
        
        # Create a Rectangle patch
        rect = plt.Rectangle(top_left, 
                             bottom_right[0] - top_left[0], 
                             bottom_right[1] - top_left[1], 
                             linewidth=2, edgecolor='red', fill=False)
        
        # Add the rectangle to the plot
        plt.gca().add_patch(rect)
        
        # Display the recognized text
        plt.text(top_left[0], top_left[1] - 10, text, fontsize=12, color='red', backgroundcolor='white')

    plt.axis('off')
    plt.show()


# Main function to execute OCR
def main(image_path):
    image = load_image(image_path)
    predictions = perform_ocr(image)
    visualize_results(image, predictions)

# Replace 'your_image.jpg' with the path to your image file
main('image.png')
