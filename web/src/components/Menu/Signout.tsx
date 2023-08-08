'use client';

import { AuthContext } from '@/contexts/Auth';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

export default function Logout() {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    const decision = confirm('Você tem certeza que deseja sair?');
    if (decision) {
      await signOut();
      alert('Sua conta foi desconectada.');
      router.refresh();
    }
  };
  return (
    <>
      <button
        className="w-full h-full text-red-600 flex justify-center items-center"
        onClick={logout}
      >
        <LogOut className="w-8 h-8" />
      </button>
    </>
  );
}
