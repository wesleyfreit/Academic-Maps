'use client';

import { Event } from '@/configs/Interfaces';
import { ClipboardType } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import BackgroundWindow from '@/contexts/BackgroundWindow';
import Link from 'next/link';
import { useGoogleMap } from '@react-google-maps/api';
import InfoWindowList from '../Maps/InfoWindowList';

export default function ViewEvent() {
  const [event, setEvent] = useState<Event>();
  const { backgroundWindow, setBackgroundWindow } = useContext(BackgroundWindow);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const search = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const maps = useGoogleMap();

  const point = {
    lat: search.get('lat') ? parseFloat(search.get('lat')!) : 0,
    lng: search.get('lng') ? parseFloat(search.get('lng')!) : 0,
  };

  const handleInfoWindow = () => {
    if (infoWindowOpen) {
      setInfoWindowOpen(false);
      router.push('/');
    } else {
      setInfoWindowOpen(true);
    }
  };

  useEffect(() => {
    if (params.id) {
      (async () => {
        try {
          const response = await api.get(`/events/${params.id}`);
          setEvent(response.data);
        } catch (error) {
          router.push('/');
        }
      })();
    }
  }, [params.id]);

  useEffect(() => {
    if (event?._id) {
      maps!.setCenter({
        lat: event?.point.coordinates[1],
        lng: event?.point.coordinates[0],
      });
      maps!.setZoom(15);
    }
  }, [event?._id]);

  useEffect(() => {
    if (point.lat) {
      handleInfoWindow();
    }
  }, [point.lat | point.lng]);

  return (
    <>
      {backgroundWindow && (
        <div
          className="z-[2] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] p-10 border-gray-800 border bg-gray-900 text-center rounded-xl 
          shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-2xl"
        >
          <h1 className="uppercase font-alt text-xl font-bold flex justify-center">
            <ClipboardType className="text-blue-700 mr-2" /> {event?.title}
          </h1>
          <div className="mt-5 flex flex-col overflow-y-auto items-center">
            <div className="flex space-x-2">
              <p className="font-bold">Data:</p>
              <p>{`${dayjs(event?.startDate).format('DD[/]MM[/]YYYY')}`}</p>
              <p>~</p>
              <p>{`${dayjs(event?.endDate).format('DD[/]MM[/]YYYY')}`}</p>
            </div>
            <div className="mt-3 h-96 overflow-y-auto">
              <p>{`${event?.description}`}</p>
            </div>
            <div className="mt-5 flex justify-center space-x-3">
              <button
                className="bg-red-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-red-800 
              active:border-red-400 rounded-lg relative px-10 py-2 "
              >
                Deletar
              </button>
              <button
                className="bg-yellow-600 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-yellow-700 
              active:border-yellow-400 rounded-lg relative px-10 py-2"
              >
                Editar
              </button>
              <Link
                href={`/events/${event?._id}/?lat=${event?.point.coordinates[1]}&lng=${event?.point.coordinates[0]}`}
                onClick={() => setBackgroundWindow(false)}
                className="bg-green-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-green-800 
              active:border-green-400 rounded-lg relative px-10 py-2 "
              >
                Ver Mapa
              </Link>
              <button
                onClick={() => {
                  router.back();
                  setBackgroundWindow(false);
                }}
                className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 
              active:border-blue-400 rounded-lg relative px-10 py-2 "
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
      <InfoWindowList
        point={point}
        title={event?.title as string}
        handleInfoWindow={handleInfoWindow}
        infoWindowOpen={infoWindowOpen}
      />
    </>
  );
}
