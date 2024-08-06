from flask import Flask, jsonify, request
import time
import logging
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import boto3
import os

app = Flask(__name__)

app.logger.setLevel(logging.INFO)

device = 'cpu'

app.logger.info("loading model")

model_name = os.environ.get('MODEL_NAME', 'gpt2')

model = GPT2LMHeadModel.from_pretrained(model_name)
model.to(device)
model.eval()
app.logger.info("model loaded")

@app.route('/generate', methods=['POST'])
def generate():

    start_time = time.time()
    prompt = request.json.get('prompt')
    
    app.logger.info("running")
    
    generated_text = generate_from_prompt(prompt=prompt, num_samples=5, steps=20)
    end_time = time.time() - start_time
    
    app.logger.info("Total Taken => ",end_time)
    
    response = {
        'text': generated_text, 
        'time': end_time
    }

    return jsonify(response)

def generate_from_prompt(prompt='', num_samples=10, steps=20, do_sample=True):
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    if prompt == '':
        # to create unconditional samples...
        # huggingface/transformers tokenizer special cases these strings
        prompt = '<|endoftext|>'
    encoded_input = tokenizer(prompt, return_tensors='pt').to(device)
    x = encoded_input['input_ids']

    # we'll process all desired num_samples in a batch, so expand out the batch dim
    x = x.expand(num_samples, -1)

    # forward the model `steps` times to get samples, in a batch
    y = model.generate(x, max_new_tokens=steps, do_sample=do_sample, top_k=40)

    responses = ""
    for i in range(num_samples):
        out = tokenizer.decode(y[i].cpu().squeeze())
        responses += out + "\n"
    
    return responses


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8008)
