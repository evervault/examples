# Invoke OCR on a Sensitve Document in an Enclave

A Python app that takes in a passport document and uses an OCR library to detect the fields within a document, assess the validty of the document, and determine whether based on the document you are approved for a loan. You can follow allong using the [associated guide from the Evervault docs](https://docs.evervault.com/guides/lending-enclave).


## Prerequisites

- Python 3.6 or higher
- An Evervault account ([create a free account here](https://app.evervault.com/register))
- Docker installed ([get it here](https://docs.docker.com/get-docker/))


## Install and Run the Enclaves CLI

```
curl https://enclave-build-assets.evervault.com/cli/install -sL | sh
```


## Add the Environment Variables
In the Enclaves Dashboard, add the following environment variables as secrets:
`EV_API_KEY`
`TEAM_ID`
`APP_ID`


## Initialize the Enclaves

```
export EV_API_KEY=

ev-enclave init -f ./Dockerfile \
--name ocr-enclave \
```


## Build the Enclave

`ev-enclave build --write --output .`


## Run the Enclave

`ev-enclave deploy --eif-path ./enclave.eif`

## Run the Client

In the Client directory, open up `.env.example` and rename it to `.env`, then add your API key, Enclave name and app ID.

Now you may run the Flask app which will allow you to upload a passport file and test the app. 

```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
cd client
flask run
```

When run successfully, you should get an alert informing you of whether the application was approved, denied, or requires further information.
