'use client';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const [valueSearch, setValueSearch] = useState('');

  useEffect(() => {console.log(valueSearch)}, []);

  const search = () => {
    console.log(valueSearch);
  };

  return (
    <div
      title="Pesquisar Evento"
      className="mt-[9px] left-[50%] absolute flex h-12 w-12 z-10 cursor-pointer justify-center"
    >
      <label htmlFor="search" className="flex justify-center h-fit">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Pesquisar evento"
          className="rounded-lg px-3 py-2 pr-12 w-80 outline-none border shadow-black shadow-sm border-transparent bg-slate-700 focus:border-gray-500 text-lg text-gray-100 placeholder:text-gray-400"
          onChange={(e) => setValueSearch(e.target.value)}
          onKeyDown={(e) => e.key == "Enter"? search(): null}
        />
        <button
          className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 active:border-blue-400 rounded-lg relative -ml-10 px-2"
          onClick={search}
        >
          <Search />
        </button>
      </label>
    </div>
  );
}

