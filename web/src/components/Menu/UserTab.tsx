import { LogOut } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function UserTab(props: { username: string }) {
  const { username } = props;
  return (
    <>
      <div
        id="user-tab"
        className="absolute bg-gray-600 p-2 pr-5 rounded shadow-black shadow-md mt-[.6rem] -ml-2 cursor-auto"
      >
        <p className="font-bold text-xl mb-2">{username}</p>
        <Link
          title="Sair da Conta"
          href={'/api/signout'}
          className="text-red-600 hover:font-bold hover:text-red-500 "
        >
          <LogOut className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
}
