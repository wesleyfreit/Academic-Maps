import './globals.css';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`
        ${inter.className} 
        ${baiJamjuree.className} 
        bg-gray-900 font-sans 
        text-gray-100
        `}
      >
        <GoogleMaps />
        <div>{children}</div>
      </body>
    </html>
  );
}
