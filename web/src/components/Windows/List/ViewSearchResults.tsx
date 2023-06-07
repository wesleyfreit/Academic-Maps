'use client';

import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import { FileSearch } from 'lucide-react';
import BackgroundWindow from '@/contexts/BackgroundWindow';

import { Event } from '@/configs/Interfaces';
import EventResult from './Item/EventResult';
import { api } from '@/lib/api';

export default function ViewSearchResults() {
  const search = useSearchParams();

  const title = search.get('title');

  const { backgroundWindow, setBackgroundWindow } = useContext(BackgroundWindow);
  const [searchResults, setSearchResults] = useState<Event[]>([]);

  useEffect(() => {
    if (title) {
      (async () => {
        try {
          const response = await api.get(`/events/?title=${title}`);
          setSearchResults(response.data);
        } catch (error) {
          alert('Erro ao fazer a busca, se o erro persistir tente novamente mais tarde.');
          setBackgroundWindow(false);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if(title) setBackgroundWindow(true);
  }, []);

  return (
    <>
      {backgroundWindow && (
        <div
          className="p-5 z-[2] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] border-gray-800 border bg-gray-900 text-center rounded-xl 
        shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-lg"
        >
          <h1 className="uppercase font-alt text-xl font-bold flex mb-1 justify-center">
            <FileSearch className="text-blue-700 mr-2" /> Pesquisa
          </h1>
          <p>Resultado para: {title}</p>
          <div className="overflow-y-auto mt-2 max-h-[70vh]">
            <ul className="flex flex-col py-3 px-2 space-y-3 w-full justify-center">
              {searchResults.length != 0 ? (
                searchResults.map((event) => {
                  return <EventResult key={event._id} event={event} />;
                })
              ) : (
                <li className="text-gray-300">Sem resultados encontrados</li>
              )}
            </ul>
          </div>
          <div className="mt-5 w-full h-full flex justify-center space-x-3">
            <Link
              href="/"
              className="bg-red-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-red-800 active:border-red-400 rounded-lg 
              relative px-7 py-2"
              onClick={() => {
                setBackgroundWindow(false);
              }}
            >
              Fechar
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
