import '@/styles/globals.css'
import { Inter } from '@next/font/google'

import GitHubComponent from './GithubComponent';

const inter = Inter({ subsets: ['latin'] })

export default function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className={inter.className}>
      < GitHubComponent />
    </div>
  );
}