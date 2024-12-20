import React from 'react';
import { createRoot } from 'react-dom/client';
import { EvervaultProvider } from '@evervault/react';
import App from './App';

const TEAM_ID = import.meta.env.VITE_EV_TEAM_ID;
const APP_ID = import.meta.env.VITE_EV_APP_ID;

if (!TEAM_ID || !APP_ID) {
  throw new Error('VITE_EV_TEAM_ID and VITE_EV_APP_ID must be set in your environment variables');
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <EvervaultProvider teamId={TEAM_ID} appId={APP_ID}>
      <App />
    </EvervaultProvider>
  </React.StrictMode>
);
