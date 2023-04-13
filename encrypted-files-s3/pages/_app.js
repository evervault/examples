import '@/styles/globals.css'
import { EvervaultProvider } from '@evervault/react';
import ChildComponent from './ChildComponent';

export default function App() {
  return (
    <EvervaultProvider teamId={'team_2da709d50917'} appId={'app_3babfc3edba3'}>
      <ChildComponent />
    </EvervaultProvider>
  );
}
