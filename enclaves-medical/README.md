# Run Inference on a Sensitive Model and Data in an Enclave

A Python app that takes in an image file of a brain scan and runs the image against a brain tumor segmentation model in an Enclave, returning an image with potential tumor areas highlighted. You can follow allong using the [associated guide from the Evervault docs](https://docs.evervault.com/guides/medical-enclave).


## Prerequisites

- An Evervault account ([create a free account here](https://app.evervault.com/register))
- Docker installed ([get it here](https://docs.docker.com/get-docker/))


## Install and Run the Enclaves CLI

```
curl https://enclave-build-assets.evervault.com/cli/v1/install -sL | sh
```


## Add the Environment Variables

In the Enclaves Dashboard, you can optinally override the `MODEL_URL` environment to point to other image detection models.


## Initialize the Enclave

```
ev-enclave init -f ./Dockerfile \
--name med-enclave \
--disable-api-key-auth
```


## Build the Enclave

`ev-enclave build --write --output .`


## Run the Enclave

`ev-enclave deploy --eif-path ./enclave.eif`

## Run the Client

In the Client directory, open up `.env.example` and rename it to `.env`, then add your Enclave name and app ID.

Now you may run the client script, which will pass the sample image into the Enclave and run inference on the ML model. 

```
cd client
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 client_script.py
```

When run successfully, you should see response-image.png in your file tree.
