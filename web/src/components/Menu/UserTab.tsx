'use client'

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function UserTab(props: { username: string }) {
  const { username } = props;
  const router = useRouter()

  const logout = async () => {
    const decision = confirm("Você tem certeza que deseja sair?");
    if(decision){
      router.push('/api/signout');
      alert('Sua conta foi desconectada.');
      router.refresh();
    }
  }
  return (
    <>
      <div
        id="user-tab"
        className="absolute bg-gray-600 p-2 pr-5 rounded shadow-black shadow-md mt-[.6rem] -ml-2 cursor-auto"
      >
        <p className="font-bold text-xl mb-2">{username}</p>
        <button
          title="Sair da Conta"
          onClick={logout}
          className="text-red-600 hover:font-bold hover:text-red-500 "
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
