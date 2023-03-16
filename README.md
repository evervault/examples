<!--
title: 'Evervault Sample Code'
description: 'Simple examples of how to use Evervault to collect, process and share sensitive data'
layout: Doc
platform: AWS
language: nodeJS
authorLink: 'https://github.com/evervault'
authorName: 'Evervault'
authorAvatar: 'https://avatars.githubusercontent.com/u/47702631?s=200&v=4'
-->

[![Evervault](https://evervault.com/evervault.svg)](https://evervault.com/)

# Evervault Examples

This repository contains source code samples to give you an idea of how to integrate [Evervault](https://evervault.com/) into an application to securely collect, process and share sensitive data.

## Table of Contents
<details>
<summary>Click to expand</summary>

- [Evervault Examples](#evervault-examples)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Examples](#examples)
  - [Community Examples](#community-examples)
  - [Contributing](#contributing)
    - [Adding example code](#adding-example-code)
    - [Adding a community example](#adding-a-community-example)

</details>

## Getting Started

If you are new to Evervault, we recommend getting started by creating a [free account](https://app.evervault.com/register).

## Examples

Each example contains a `README.md` with an explanation about the example and its use cases.

**Have an example?** Submit a PR or [open an issue](https://github.com/evervault/examples/issues). ⚡️

| Example | Runtime  |
|:--------------------------- |:-----|
| [Inbound Relay](https://github.com/evervault/examples/tree/main/inbound-relay-example) <br/> Use Inbound Relay to securely store your customer's personal data in a database. | NodeJS |
| [Outbound Relay](https://github.com/evervault/examples/tree/main/outbound-relay-example) <br/> Use Outbound Relay to intercept your requests to third parties, and decrypt any Evervault encrypted data before forwarding it on to its destination. | NodeJS |
| [Multiple Functions](https://github.com/evervault/examples/tree/main/multi-function-example) <br/> Demonstrates having multiple functions in a single github repository. | NodeJS |
| [Encrypted Multi-PSP](https://github.com/evervault/examples/tree/main/encrypted-multi-psp-example) <br/> Use Evervault Inputs and Outbound Relay to collect and encrypt card details before conditionally sending them to multiple Payment Processors. | NodeJS |
| [OAuth 2 Access Tokens - Python](https://github.com/evervault/examples/tree/main/oauth2-access-tokens/python) <br/> Use the Python SDK and Outbound Relay to encrypt access tokens from a Github OAuth app. | Python |
| [OAuth 2 Access Tokens - JavaScript](https://github.com/evervault/examples/tree/main/oauth2-access-tokens/js) <br/> Use the React and Node SDKs with Outbound Relay to encrypt access tokens from a Github OAuth app. | NodeJS |

## Community Examples

| Example | Author  |
|:--------------------------- |:-----|
| [PDF Encryptor](https://github.com/shanecurran/pdf-encryptor) <br/> Encrypt PDFs using an Evervault Function. | [shanecurran](https://github.com/shanecurran) |

Be the first to share an example use case of Evervault with the community!

## Contributing

We are happy to accept examples from the community. 🎉

### Adding example code

1. Create an example use case of Evervault by levering any of our products! 

2. Include a README.md explaining what it does, how to run it and any dependencies it might require.

3. Open a new pull request with your example. ⚡️

### Adding a community example

We love hearing about projects happening in the community. Feel free to add your Evervault project to our list.

1. Add `link`, `title`, and `description` to the [community-examples.json](https://github.com/evervault/examples/community-examples.json) file.

2. Open a new pull request with your example. ⚡️
