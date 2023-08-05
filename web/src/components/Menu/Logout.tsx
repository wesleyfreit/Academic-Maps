'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Logout() {
  const router = useRouter();

  const logout = async () => {
    const decision = confirm('Você tem certeza que deseja sair?');
    if (decision) {
      router.push('/api/signout');
      alert('Sua conta foi desconectada.');
      router.refresh();
    }
  };
  return (
    <>
      <button className="w-full h-full text-red-600 flex justify-center items-center" onClick={logout}>
        <LogOut className="w-8 h-8" />
      </button>
    </>
  );
}
