import evervault
import urllib3
import requests
import time
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

enclave_name = os.environ.get('ENCLAVE_NAME')
app_id = os.environ.get('APP_ID')

attested_session = evervault.attestable_enclave_session({ 
    enclave_name: {
        "PCR0": "",
        "PCR1": "",
        "PCR2": "",
        "PCR8": ""
  } 
})

filename = "sample-image.png"
with open(filename, "rb") as file:
    file_bytes = file.read()

fields = {
    "upload": (filename, file_bytes),
}

body, header = urllib3.encode_multipart_formdata(fields)

start = time.time()

response = attested_session.post(
    f'https://{enclave_name}.{app_id}.enclave.evervault.com/upload',
    headers={'Content-Type': header},
	data=body
)

print(f'Time: {time.time() - start}')
print(response)

with open('response-image.png', 'wb') as output_file:
    output_file.write(response.content)

    