from google.cloud import vision
import io

def detect_objects(image_path):
    """Detects objects in an image file."""
    
    # Initialize the Vision client
    client = vision.ImageAnnotatorClient()

    # Load the image into memory
    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    # Perform object localization on the image file
    objects = client.object_localization(image=image).localized_object_annotations

    print(f"Number of objects found: {len(objects)}")
    for obj in objects:
        print(f"Object: {obj.name}, Confidence: {obj.score:.2f}")
        print("Bounding polygon vertices:")
        for vertex in obj.bounding_poly.normalized_vertices:
            print(f" - ({vertex.x}, {vertex.y})")

if __name__ == "__main__":
    image_file = "image.jpeg"  # Change this to your actual image file name
    detect_objects(image_file)
