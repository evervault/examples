## Build Encrypted Card Payments Across Multiple Payment Processors

This repo will help you build a card payments app to be used across multiple payment service providers (PSPs) using Evervault Inputs.

Inputs encrypts customer card data and keeps it encrypted as it moves from your client to your server.

You can then pass the encrypted card data to multiple payment processors, such as Checkout.com and Stripe, where Outbound Relay automatically decrypts the card details. You can add additional payment processors as needed.

To get an idea of what it will look like at the end of the guide, watch [this demo](https://www.youtube.com/watch?v=FQ8_ZDBJdTM).

## Getting Started

Check out the starter app to follow along in the guide:

`git clone https://github.com/evervault/examples/encrypted-multi-psp`
`git checkout tags/starter-project`

Or clone the finished project to run instantly:

`git clone https://github.com/evervault/examples/encrypted-multi-psp`

Install the dependencies and start the server.

`npm install`
`npm run dev`

## Environment Variables

Add the Evervault, Stripe, and Checkout.com credentials and add them to `.env.example`. Then rename the file.

`mv .env.example .env`

## Learn More

To learn more about Evervault check out:

- [Evervault Inputs](https://docs.evervault.com/products/inputs)
- [Evervault JavaScript SDK](https://docs.evervault.com/sdks/javascript)
- [Evervault Node SDK](https://docs.evervault.com/sdks/nodejs)
- [Evervault Outbound Relay](https://docs.evervault.com/products/outbound-relay)
