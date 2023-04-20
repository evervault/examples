import '@/styles/globals.css'
import { EvervaultProvider, EvervaultInput } from '@evervault/react';

export default function App() {

  return (
    <EvervaultProvider teamId={process.env.NEXT_APP_TEAM_ID} appId={process.env.NEXT_APP_APP_ID}>
      <EvervaultInput />
    </EvervaultProvider>
  );
}
