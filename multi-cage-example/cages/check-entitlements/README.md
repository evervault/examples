# Hello Cage
[Evervault](https://evervault.com) makes it easy to encrypt data at source, process it in a Cage — a secure, serverless function — and never store it unencrypted.

This is a simple Evervault Cage example, to help get you up and running on the Evervault platform quickly.

## Getting started with Evervault

Evervault consists of two parts, encrypting your data at source, using either our Node SDK, or Browser and React SDKs and then sending that encrypted data to a Cage to be processed securely.

This Cage takes a payload that should contain a `name` key. Running the Cage is very simple.

## The steps
1. Encrypt your data at source, using either the Node SDK or Browser and React SDKs.
2. Process the encrypted data in a Cage

### Encrypting at source
```javascript
// This example uses the Evervault Node SDK.
const Evervault = require('@evervault/sdk');

// Initialize the client with your team’s API key
const evervault = new Evervault('<YOUR-API-KEY>');

// Encrypt your data
const encrypted = await evervault.encrypt({ name: 'Claude Shannon' });
```

### Process your encrypted data in a Cage
You should encrypt this payload using either our Node SDK or Browser SDK, then run it in the Hello Cage:

```javascript
// Process the encrypted data in a Cage
const result = await evervault.run('hello-cage', encrypted);
```

## Understanding the Cage
This Cage is very simple. Here is the full code:

```javascript
exports.handler = async (data) => {
  if (data.name && typeof data.name === "string") {
    console.debug(`A name of length ${data.name.length} has arrived into the Cage.`);

    return {
      message: `Hello from a Cage! It seems you have ${data.name.length} letters in your name`,
      name: await evervault.encrypt(data.name),
    };
  } else {
    console.debug('An empty name has arrived into the Cage.');

    return {
      message: 'Hello from a Cage! Send an encrypted `name` parameter to show Cage decryption in action',
    };
  }
};
```

Or check it out in [index.js](./index.js).

--- 
If you want to know more about Evervault, check out our [documentation](https://docs.evervault.com).
