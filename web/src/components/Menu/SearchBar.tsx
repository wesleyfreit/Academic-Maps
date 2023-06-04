'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

import BackgroundWindow from '@/contexts/BackgroundWindow';

export default function SearchBar() {
  const { setBackgroundWindow } = useContext(BackgroundWindow);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handlePressEnter = () => {
    router.push(`/events/search/?title=${searchValue}`);
    setBackgroundWindow(true);
  };

  return (
    <>
      <div
        title="Pesquisar Evento"
        className="mt-[9px] left-[50%] absolute flex h-12 w-12 cursor-pointer justify-center"
      >
        <label htmlFor="search" className="flex justify-center h-fit">
          <input
            autoComplete="off"
            type="text"
            name="search"
            id="search"
            placeholder="Pesquisar evento"
            className="rounded-lg px-3 py-2 pr-12 w-80 outline-none border shadow-black shadow-sm border-transparent bg-slate-700 focus:border-gray-500 text-lg 
            text-gray-100 placeholder:text-gray-400"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key == 'Enter'? handlePressEnter(): null}
          />
          <Link
            className="bg-blue-700 flex items-center border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 active:border-blue-400 rounded-lg relative 
            -ml-10 px-2"
            href={`/events/search?title=${searchValue}`}
            onClick={() => setBackgroundWindow(true)}
          >
            <Search />
          </Link>
        </label>
      </div>
    </>
  );
}
