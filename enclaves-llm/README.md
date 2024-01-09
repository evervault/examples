# Run GPT2 in an Enclave

A Python app that takes in a text prompt and generates text using GPT-2. You can follow allong using the [associated guide from the Evervault docs](https://docs.evervault.com/guides/enclaves-llm).


## Prerequisites

- An AWS account ([sign up or log in here](https://portal.aws.amazon.com/))
- An Evervault account ([create a free account here](https://app.evervault.com/register))
- Docker installed ([get it here](https://docs.docker.com/get-docker/))


## Install and Run the Enclaves CLI

```
curl https://enclave-build-assets.evervault.com/cli/v1/install -sL | sh
```


## Add the Environment Variables
In the Enclaves Dashboard, add the following environment variables as secrets:
`S3_REGION`
`ACCESS_KEY`
`SECRET_ACCESS_KEY`
`BUCKET_NAME`


## Initialize the Enclave

```
ev-enclave init -f ./Dockerfile \
--name llm-enclave
```


## Build the Enclave

`ev-enclave build --write --output .`


## Run the Enclave

`ev-enclave deploy --eif-path ./enclave.eif`

## Make a CURL Request

In your terminal make a CURL request to the Enclave endpoint and pass in a prompt as JSON.

```
curl -X POST \
-H "API-Key: <API_KEY>" \
-H 'Content-Type: application/json' \
-d '{ "prompt": "Encryption is" }' \
https://<enclave_name>.<app_uuid>.enclave.evervault.com/generate  -k
```

When run successfully, you should get a response that looks like the below.

```
{
    "text": "Encryption is always a hard problem to solve. Encryption is the process of encoding data into a cipher. Encryption is important to us as this should keep your data safe. Encryption is done through your browser. Here.",
    "time": 973.0725193023682
}
```