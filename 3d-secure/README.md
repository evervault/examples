# 3D Secure

This example shows how you can use UI components to collect card information and use Evervault's 3D-Secure APIs to reduce fraud and provide an additional layer of authentication for online transactions.

## Overview

**Features:**
- **Create a 3DS Session:** Use the `create3DSSession` function to initiate a new 3D Secure session for a given card and payment details.
- **Retrieve an Existing 3DS Session:** Use the `get3DSSession` function to fetch details of an existing session by its `sessionId`.


## Run it

1. **Set Environment Variables:**
   - `VITE_EV_API_KEY`: Your API key
   - `VITE_EV_APP_ID`: Your app's UUID.
   - `VITE_EV_TEAM_ID`: Your team's UUID


2. **Install and Run**
  ```bash
    npm install
    npm run dev
