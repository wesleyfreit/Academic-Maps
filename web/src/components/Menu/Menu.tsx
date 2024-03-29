'use client';

import { List, X } from 'lucide-react';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

import { Event } from '@/configs/Interfaces';
import { usePathname } from 'next/navigation';
import ViewEventsList from '../Windows/List/ViewEventsList';

const activeSide = `bg-gray-900 w-80 h-screen fixed duration-700 z-[2] transform transition-all shadow-xl shadow-black`;
const normalButtonMenu = `bg-gray-500 mt-2 shadow-black shadow-sm ml-2 fixed flex w-12 h-12 hover:bg-gray-400 rounded-lg cursor-pointer items-center 
  justify-center duration-700 transform transition-all`;

export default function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const [eventsList, setEventsList] = useState<Event[]>([]);

  const handleOpenList = () => {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  useEffect(() => {
    if (pathname === '/') {
      (async () => {
        try {
          const response = await api.get('/events');
          setEventsList(response.data);
        } catch (error) {
          alert('Erro no servidor, tente novamente mais tarde.');
        }
      })();
    }
  }, [pathname]);

  const map = document.getElementById('map');
  const loading = document.getElementById('loading');

  if (eventsList.length > 0 && map && loading) {
    map.style.display = 'flex';
    loading.style.display = 'none';
  }

  return (
    <>
      <div
        title="Visualizar eventos"
        className={openMenu ? `${normalButtonMenu} translate-x-80 z-[2]` : normalButtonMenu}
        onClick={handleOpenList}
      >
        <X
          className={
            openMenu
              ? `opacity-100 absolute w-8 h-8 transition-opacity duration-500`
              : `opacity-0 absolute w-8 h-8 transition-opacity duration-500`
          }
        />
        <List
          className={
            !openMenu
              ? `opacity-100 aboslute w-8 h-8 transition-opacity duration-500`
              : `opacity-0 aboslute w-8 h-8 transition-opacity duration-500`
          }
        />
      </div>
      <div className={openMenu ? `${activeSide} z-[2]` : `${activeSide} -translate-x-80`}>
        <div className="flex h-screen flex-col w-full">
          <div className="overflow-y-auto scroll-px-0 p-2">
            {eventsList.length == 0 ? (
              <div className="flex justify-center text-gray-400">
                <h1>Sem eventos cadastrados</h1>
              </div>
            ) : (
              <ViewEventsList
                eventsList={eventsList}
                openMenu={openMenu}
                onClose={handleOpenList}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={openMenu ? 'w-screen h-screen bg-black bg-opacity-30 fixed z-[1]' : ''}
        onClick={() => setOpenMenu(false)}
      />
    </>
  );
}
