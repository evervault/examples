## Build Encrypted Card Payments Across Multiple Payment Processors

This repo will help you build a card payments app to be used across multiple payment service providers (PSPs) using Evervault Inputs.

Get full details and setup instructions in our [Guides](https://docs.evervault.com/guides/multi-psp). To see what it will look like at the end of the guide, watch [this demo](https://www.youtube.com/watch?v=FQ8_ZDBJdTM).

## Getting Started

Clone the repo:

`git clone https://github.com/evervault/examples/encrypted-multi-psp-example`

Install the dependencies and start the server.

```
npm install
npm run dev
```

## Environment Variables

Add the Evervault, Stripe, and Checkout.com credentials and add them to `.env.example`. Then rename the file.

`mv .env.example .env`

Add the App ID and Team ID to `index.html`

```
const evervault = new Evervault("team_yourteamid", "app_yourappid");
```

## Learn More

To learn more about Evervault check out:

- [Evervault Inputs](https://docs.evervault.com/products/inputs)
- [Evervault JavaScript SDK](https://docs.evervault.com/sdks/javascript)
- [Evervault Node SDK](https://docs.evervault.com/sdks/nodejs)
- [Evervault Outbound Relay](https://docs.evervault.com/products/outbound-relay)
