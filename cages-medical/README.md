# Run Inference on a Sensitive Model and Data in a Cage

A Python app that takes in an image file of a brain scan and runs the image against a brain tumor segmentation model in a Cage, returning an image with potential tumor areas highlighted. You can follow allong using the [associated guide from the Evervault docs](https://docs.evervault.com/guides/cages-medical-data).


## Prerequisites

- An AWS account ([sign up or log in here](https://portal.aws.amazon.com/))
- An Evervault account ([create a free account here](https://app.evervault.com/register))
- Docker installed ([get it here](https://docs.docker.com/get-docker/))


## Install and Run the Cages CLI

```
curl https://cage-build-assets.evervault.com/cli/install -sL | sh
```


## Add the Environment Variables
In the Cages Dashboard, add the following environment variables as secrets:
`S3_REGION`
`ACCESS_KEY`
`SECRET_ACCESS_KEY`
`BUCKET_NAME`


## Initialize the Cage

```
ev-cage init -f ./Dockerfile \
--name med-cage \
--disable-api-key-auth
```


## Build the Cage

`ev-cage build --write --output .`


## Run the Cage

`ev-cage deploy --eif-path ./enclave.eif`

## Run the Client

In the Client directory, open up `.env.example` and rename it to `.env`, then add your Cage name and app ID.

Now you may run the client script, which will pass the sample image into the Cage and run inference on the ML model. 

```
cd client
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 client_script.py
```

When run successfully, you should see response-image.png in your file tree.