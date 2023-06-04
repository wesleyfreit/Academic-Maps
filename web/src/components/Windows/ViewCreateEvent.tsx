'use client';

import { FormEvent, useContext, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { ClipboardType } from 'lucide-react';
import { Marker } from '@react-google-maps/api';

import BackgroundWindow from '@/contexts/BackgroundWindow';
import { api } from '@/lib/api';
import MapClickedPosition from '@/contexts/MapClickedPosition';

export default function ViewCreateEvent() {
  const search = useSearchParams();
  const router = useRouter();

  const { backgroundWindow, setBackgroundWindow } = useContext(BackgroundWindow);
  const { setMapClickedPosition } = useContext(MapClickedPosition);

  const point = {
    lat: search.get('lat') ? parseFloat(search.get('lat')!) : 0,
    lng: search.get('lng') ? parseFloat(search.get('lng')!) : 0,
  };

  useEffect(() => {
    !backgroundWindow ? router.push('/') : null;
  });

  const [date, setChange] = useState<DateValueType | null>(null);

  const handleDateChange = (newDate: DateValueType) => setChange(newDate);

  const handleCreateLocation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await api.post('/events', {
        title: formData.get('title'),
        startDate: date?.startDate,
        endDate: date?.endDate,
        description: formData.get('description'),
        lat: point.lat,
        lng: point.lng,
      });
      setMapClickedPosition(undefined);
      setBackgroundWindow(false);
      router.push('/');
    } catch (error) {
      alert('Erro ao salvar o evento, se o erro persistir tente novamente mais tarde');
    }
  };

  return (
    <>
      {backgroundWindow && (
        <div className="z-[2] relative w-fit left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-lg">
            <h1 className="uppercase font-alt text-xl font-bold flex justify-center">
              <ClipboardType className="mr-2 text-blue-700" /> Criação do Evento
            </h1>
            <form onSubmit={handleCreateLocation} className="mt-5 flex flex-col">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Título"
                className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400"
              />
              <div className="mt-4 relative">
                <Datepicker
                  placeholder={'Início do evento ~ Fim do evento'}
                  displayFormat={'DD/MM/YYYY'}
                  i18n={'pt'}
                  readOnly={true}
                  useRange={false}
                  value={date}
                  onChange={handleDateChange}
                  inputClassName="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 
                  placeholder:text-gray-400 w-full focus:ring-0 "
                />
              </div>
              <textarea
                name="description"
                id="description"
                spellCheck={false}
                className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 
                         placeholder:text-gray-400 mt-5 resize-none h-52"
                placeholder="Adicione uma breve descrição do evento"
              />
              <div className="mt-5 w-full h-full flex justify-center space-x-3">
                <Link
                  href="/"
                  className="bg-red-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-red-800 active:border-red-400 rounded-lg 
                  relative px-7 py-2"
                  onClick={() => {
                    setBackgroundWindow(false);
                  }}
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 active:border-blue-400 
                  rounded-lg relative px-10 py-2 "
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
          {point && <Marker position={point} title="Posição selecionada" clickable={false} />}
        </div>
      )}
    </>
  );
}
