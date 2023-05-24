import './globals.css';
import { ReactNode } from 'react';

import { GoogleMaps } from '@/components/GoogleMaps';

import { Bai_Jamjuree as BaiJamjuree, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
});

export const metadata = {
  title: 'Academic Maps',
  description: `Um criador de eventos de eventos acadêmicos onde podem ser salvos 
    localizações, datas e títulos de eventos acadêmicos, neste projeto será utilizado 
    React, Next.js, TailwindCSS e TypeScript..`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`
        ${inter.variable} 
        ${baiJamjuree.variable} 
        bg-gray-900 font-sans 
        text-gray-100
        `}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
