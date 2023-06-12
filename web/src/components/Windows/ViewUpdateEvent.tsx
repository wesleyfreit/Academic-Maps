'use client';

import { FormEvent, useContext, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { ClipboardType, PenLine } from 'lucide-react';
import { Marker, useGoogleMap } from '@react-google-maps/api';

import BackgroundWindow from '@/contexts/BackgroundWindow';
import { api } from '@/lib/api';
import MapClickedPosition from '@/contexts/MapClickedPosition';
import { Event } from '@/configs/Interfaces';

export default function ViewCreateEvent() {
  const [event, setEvent] = useState<Event>();
  const { backgroundWindow, setBackgroundWindow } = useContext(BackgroundWindow);
  const { mapClickedPosition, setMapClickedPosition } = useContext(MapClickedPosition);
  const [date, setDate] = useState<DateValueType | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRequired, setIsRequired] = useState(false);

  const router = useRouter();
  const params = useParams();

  const maps = useGoogleMap();

  useEffect(() => {
    if (params.id) {
      (async () => {
        try {
          const response = await api.get(`/events/${params.id}`);
          setEvent(response.data);
        } catch (error) {
          alert('Erro ao consultar o servidor');
          router.push('/');
        }
      })();
    }
  }, [params.id]);

  useEffect(() => {
    if (event?._id) {
      setDate({ startDate: event.startDate, endDate: event.endDate });
      setMapClickedPosition({ lat: event.point.coordinates[1], lng: event.point.coordinates[0] });
      maps!.setCenter({
        lat: event.point.coordinates[1],
        lng: event.point.coordinates[0],
      });
      maps!.setZoom(15);

      setTitle(event.title)
      setDescription(event.description.toString());
    }
  }, [event?._id]);

  const handleUpdateLocation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (formData.get('title') && date?.startDate && event?._id && mapClickedPosition?.lat) {
      try {
        await api.put(`/events/${event._id}`, {
          title: formData.get('title'),
          startDate: date.startDate,
          endDate: date.endDate,
          description: formData.get('description'),
          point: {
            type: 'Point',
            coordinates: [mapClickedPosition.lng, mapClickedPosition.lat],
          },
        });
        alert('Evento atualizado com sucesso.');
        setMapClickedPosition(undefined);
        setBackgroundWindow(false);
        router.push('/');
      } catch (error) {
        alert('Erro ao atualizar o evento, se o erro persistir tente novamente mais tarde.');
      }
    } else return setIsRequired(true);
  };

  return (
    <>
      {backgroundWindow && event?._id && (
        <div className="z-[2] relative w-fit left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl ">
            <h1 className="uppercase font-alt text-xl font-bold flex justify-center">
              <PenLine className="mr-2 text-yellow-500" /> Edição do Evento
            </h1>
            <form onSubmit={handleUpdateLocation} className="mt-5 flex flex-col">
              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title}
                placeholder="Título*"
                className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400"
              />
              <div className="mt-4 relative">
                <Datepicker
                  placeholder={'Início do evento* ~ Fim do evento*'}
                  displayFormat={'DD/MM/YYYY'}
                  i18n={'pt'}
                  readOnly={true}
                  useRange={false}
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  inputClassName="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 
                  placeholder:text-gray-400 w-full focus:ring-0 "
                />
              </div>
              <textarea
                name="description"
                id="description"
                spellCheck={false}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 
                         placeholder:text-gray-400 mt-5 resize-none h-52"
                placeholder="Adicione uma breve descrição do evento"
              />
              {isRequired && (
                <p className=" self-start text-red-500">Os campos com * são obrigatórios.</p>
              )}
              <div className="mt-5 w-full h-full flex justify-center space-x-3">
                <button
                  type="button"
                  className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 
              active:border-blue-400 rounded-lg relative px-10 py-2"
                  onClick={() => router.back()}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setBackgroundWindow(false)}
                  className="bg-green-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-green-800 
              active:border-green-400 rounded-lg relative px-10 py-2 "
                >
                  Alterar Ponto
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-yellow-700 
              active:border-yellow-400 rounded-lg relative px-10 py-2"
                >
                  Atualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {mapClickedPosition && (
        <Marker
          position={mapClickedPosition}
          draggable={true}
          label={'UP'}
          onDragEnd={(e) => {
            setMapClickedPosition(
              e.latLng ? { lat: e.latLng.lat(), lng: e.latLng.lng() } : undefined,
            );
            setBackgroundWindow(true);
          }}
          onLoad={() => setBackgroundWindow(true)}
          onClick={() => setBackgroundWindow(true)}
        />
      )}
    </>
  );
}
