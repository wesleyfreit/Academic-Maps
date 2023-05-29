'use client'

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import BackgroundWindow from '../Windows/BackgroundWindow';
import { api } from '@/lib/api';
import EventItem from './EventItem';
import { Event } from '@/configs/Interfaces';

const activeSide = `bg-gray-900 w-80 p-2 h-screen fixed duration-700 transform z-10 transition-all shadow-xl shadow-black`;
const normalButton = `bg-gray-500 mt-2 shadow-black shadow-sm ml-2 absolute flex w-12 h-12 hover:bg-gray-400 rounded-lg z-10 cursor-pointer items-center 
  justify-center duration-700 transform transition-all`;

export default function ListEvents() {
  const [openMenu, setOpenMenu] = useState(false);

  const [eventsList, setEventsList] = useState<Event[] | null>(null);

  const handleOpenList = () => {
    if (openMenu) setOpenMenu(false);
    else setOpenMenu(true);
  };

  useEffect(() => {
    (async () => {
      if (!eventsList) {
        const response = await api.get('/events');
        setEventsList(response.data);
      }
    })();
  }, []);

  return (
    <>
      <div
        title="Visualizar eventos"
        className={openMenu ? `${normalButton} translate-x-80` : normalButton}
        onClick={handleOpenList}
      >
        <List className="w-8 h-8" />
      </div>
      <div className={openMenu ? activeSide : `${activeSide} -translate-x-80`}>
        <div className="flex h-screen flex-col w-full">
          <div className="overflow-y-auto scroll-px-0 p-2">
            {eventsList?.length == 0 || eventsList == null ? (
              <div className="flex justify-center text-gray-400">
                <h1>Sem eventos cadastrados</h1>
              </div>
            ) : (
              <ul className="flex flex-col pb-3 space-y-5 w-full justify-center">
                {eventsList &&
                  eventsList.map((event) => {
                    return (
                      <EventItem
                        key={event.id}
                        event={event}
                        onClose={handleOpenList}
                      />
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>
      {openMenu && <BackgroundWindow onClose={handleOpenList}></BackgroundWindow>}
    </>
  );
}
