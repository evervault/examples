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

# Evervault Example Code

This repository contains source code samples to give you an idea of how to integrate [Evervault](https://evervault.com/) into an application to securely collect, process and share sensitive data.

---

## Usage

The root folder of this repository contains multiple subdirectories, each of which contains a distinct example implementation of Evervault.

![Uploading image.png…]()

| Example | Description | Use Cases |
| --- | --- | --- |
| [Inbound Relay](https://docs.evervault.com/concepts/inbound-relay/overview) | Automatically encrypt data at the field-level using an encryption proxy, before it enters your infrastructure. | Encrypting sensitive data collected through your web app, including PII, PHI, card information, and secrets. |
| [Outbound relay](https://docs.evervault.com/concepts/outbound-relay/overview) | Automatically decrypt encrypted data when sharing it with third-parties, without having to handle it in plaintext. | Sharing credit card information with payment processors, or credentials/secrets with third party services. |
| Multi-Cage | Running multiple Functions in a single Github repository. | Run different logic on different sets of user data. |

---

## Get support

If you have questions, comments, or need help with code, we're here to help:
- on Twitter at [@Evervault](https://twitter.com/evervault)
- over email at support@evervault.com
