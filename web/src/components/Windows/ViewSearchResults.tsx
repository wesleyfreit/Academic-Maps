'use client';

import Searchbar from '@/contexts/Searchbar';
import { ReactNode, useEffect, useState } from 'react';
import BackgroundWindow from '../../app/providers/ViewBackgroundProvider';
import { api } from '@/lib/api';
import { FileSearch } from 'lucide-react';
import { Event } from '@/configs/Interfaces';
import EventResult from '../List/EventResult';

export default function ViewSearchResults({ children }: { children: ReactNode }) {
  const [searchStatus, setSearchStatus] = useState({
    valueSearch: '',
    isSearch: false,
    searchResults: [] as Event[],
  });
  const [backdrop, setBackdrop] = useState(searchStatus.isSearch);

  useEffect(() => {
    if (searchStatus.isSearch && searchStatus.valueSearch) {
      (async () => {
        try {
          const response = await api.get(`/events/?title=${searchStatus.valueSearch}`);
          setBackdrop(searchStatus.isSearch);
          setSearchStatus({
            valueSearch: searchStatus.valueSearch,
            isSearch: false,
            searchResults: response.data,
          });
        } catch (error) {
          alert('Erro ao fazer a busca, se o erro persistir tente novamente mais tarde.');
          setSearchStatus({ valueSearch: '', isSearch: false, searchResults: [] });
          setBackdrop(searchStatus.isSearch);
        }
      })();
    }
  });

  const handleSetBackdrop = (value: boolean) => {
    setSearchStatus({ valueSearch: '', isSearch: false, searchResults: [] });
    setBackdrop(value);
  };

  return (
    <Searchbar.Provider value={{ searchStatus, setSearchStatus }}>
      {/* {backdrop && searchStatus.searchResults.length != 0 && (
        <BackgroundWindow onClose={handleSetBackdrop}>
          <div className="flex flex-col p-5 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-lg ">
            <h1 className="uppercase font-alt text-xl font-bold flex mb-1 justify-center">
              <FileSearch className="text-blue-700 mr-2" /> Pesquisa
            </h1>
            <p>Resultado para: {searchStatus.valueSearch}</p>
            <div className="overflow-y-auto mt-2 h-[70vh]">
              <ul className="flex flex-col py-3 px-2 space-y-3 w-full justify-center">
                {searchStatus.searchResults.map((event) => {
                  return <EventResult key={event.id} event={event} />;
                })}
              </ul>
            </div>
          </div>
        </BackgroundWindow>
      )} */}
      {children}
    </Searchbar.Provider>
  );
}
