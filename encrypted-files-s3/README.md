## Upload Encrypted Files to an S3 Bucket Using Next.js

A simple Next.js app that encrypts an uploaded file using the Evervault React SDK and and saves the encrypted file to an s3 bucket via a presigned url. You can follow allong using the [associated guide from the Evervault docs](https://docs.evervault.com/guides/file-to-s3).

This demo is made with [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The request for the presigned URL can be edited in `pages/api/get-url.js`. It follows the AWS SDK for JavaScript v3 — see the [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_request_presigner.html) for further details.

The input can be edited in `ChildComponent.js` and uses the [Evervault JavaScript and React SDK](https://docs.evervault.com/sdks/javascript).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
