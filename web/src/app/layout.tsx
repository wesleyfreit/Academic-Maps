import './globals.css';
import { ReactNode } from 'react';
import { Bai_Jamjuree as BaiJamjuree, Roboto_Flex as Roboto } from 'next/font/google';

import ClickMarkerProvider from '@/app/providers/ClickMarkerProvider';
import ViewBackgroundProvider from './providers/ViewBackgroundProvider';

import GoogleMaps from '@/components/Maps/GoogleMaps';
import ListEvents from '@/components/List/EventsList';
import ViewSearchResults from '@/components/Windows/ViewSearchResults';
import SearchBar from '@/components/Menu/SearchBar';
import UserLocation from '@/components/Markers/UserLocation';

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
          <ViewBackgroundProvider>
            <ClickMarkerProvider>
              <GoogleMaps>
                <ListEvents />
                <ViewSearchResults>
                  <SearchBar />
                </ViewSearchResults>
                <UserLocation />
                {children}
              </GoogleMaps>
            </ClickMarkerProvider>
          </ViewBackgroundProvider>
        </main>
      </body>
    </html>
  );
}
