'use client';
import BackgroundWindow from '@/contexts/BackgroundWindow';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

const buttonUser = `bg-gray-500 mt-2 shadow-black shadow-sm ml-16 absolute flex w-12 h-12 hover:bg-gray-400 rounded-lg cursor-pointer items-center 
  justify-center duration-700 transform transition-all z-[0]`;

export default function Signin() {
  const { setBackgroundWindow } = useContext(BackgroundWindow);

  return (
    <div className={buttonUser}>
      <Link title="Iniciar sessão" href={'/signin'} onClick={() => setBackgroundWindow(true)}>
        <User className="w-8 h-8" />
      </Link>
    </div>
  );
}
