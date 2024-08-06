from flask import Flask, request, jsonify, send_file
import requests
import os
import torch
import requests
from PIL import Image
from torchvision import transforms
import io
import logging
import boto3
from urllib.request import urlretrieve

app = Flask(__name__)

app.logger.setLevel(logging.INFO)

model_url = os.environ.get('MODEL_URL', 'https://github.com/evervault/examples/raw/main/enclaves-medical/tumor-model.pt')
app.logger.info('downloading pre-trained model')
urlretrieve(MODEL_URL, './tumor-model.pt')
model = torch.jit.load('./tumor-model.pt')
# Set the model to evaluation mode
model.eval()
app.logger.info('model downloaded')

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    app.logger.info('upload received')

    pil_image = Image.open(request.files['upload'].stream)

    # Define the transforms to apply to the image
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    # Apply the transforms to the image
    input_tensor = transform(pil_image)

    app.logger.info('running inference')
    # Make a prediction using the input tensor
    with torch.no_grad():
        output_tensor = model(input_tensor.unsqueeze(0))

    app.logger.info('inference finished')

    # Convert the output tensor to a PIL image
    output_array = output_tensor.cpu().squeeze().numpy()
    output_array = (output_array * 255).astype('uint8')
    output_image = Image.fromarray(output_array)

    # Resize the output image to the size of the input image
    output_image = output_image.resize(pil_image.size)

    # Create a blank PIL image of the same size as the input image
    mask_image = Image.new(mode='L', size=pil_image.size, color=0)

    # Paste the output image onto the mask image
    mask_image.paste(output_image, box=(0, 0))

    # Create a copy of the input image and convert it to RGBA
    overlay_image = pil_image.copy().convert('RGBA')

    # Paste the mask image onto the overlay image
    overlay_image.paste((255, 0, 0, 128), box=(0, 0), mask=mask_image)
    app.logger.info('finished pasting onto image')

    img_io = io.BytesIO()
    overlay_image.save(img_io, 'PNG', quality=70)
    img_io.seek(0)
    
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8008)