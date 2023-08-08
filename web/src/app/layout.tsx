import './globals.css';
import { ReactNode } from 'react';
import { Bai_Jamjuree as BaiJamjuree, Roboto_Flex as Roboto } from 'next/font/google';

import ClickMarkerProvider from '@/providers/ClickMarkerProvider';
import BackgroundProvider from '../providers/BackgroundProvider';

import GoogleMaps from '@/components/Maps/GoogleMaps';
import SearchBar from '@/components/Menu/SearchBar';
import UserLocation from '@/components/Markers/UserLocation';
import { cookies } from 'next/headers';
import Menu from '@/components/Menu/Menu';
import Profile from '@/components/Menu/Profile';
import Signin from '@/components/Menu/Signin';
import { AuthProvider } from '@/providers/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
});

const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
});

export const metadata = {
  title: 'Academic Maps',
  description: `Um criador de eventos de eventos acadêmicos onde podem ser salvos localizações, datas e títulos de eventos acadêmicos, neste projeto será utilizado React, Next.js, TailwindCSS e TypeScript..`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('academic_maps.auth');
  return (
    <html lang="pt-br">
      <body
        className={`
        ${roboto.variable} 
        ${baiJamjuree.variable} 
        bg-gray-900 font-sans 
        text-gray-100
        `}
      >
        <main>
          <BackgroundProvider>
            <ClickMarkerProvider>
              <AuthProvider>
                <GoogleMaps>
                  <SearchBar />
                  {isAuthenticated ? <Profile /> : <Signin />}
                  <Menu />
                  <UserLocation />
                  {children}
                </GoogleMaps>
              </AuthProvider>
            </ClickMarkerProvider>
          </BackgroundProvider>
        </main>
      </body>
    </html>
  );
}
