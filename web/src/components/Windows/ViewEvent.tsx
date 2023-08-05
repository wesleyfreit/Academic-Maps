'use client';

import { Event } from '@/configs/Interfaces';
import { ClipboardType, Home, ThumbsUpIcon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import BackgroundWindow from '@/contexts/BackgroundWindow';
import Link from 'next/link';
import { useGoogleMap } from '@react-google-maps/api';
import InfoWindowList from '../Maps/InfoWindowList';
import MapClickedPosition from '@/contexts/MapClickedPosition';

interface events {
  _id: string;
  title: string;
  quantity: number;
}

export default function ViewEvent() {
  const [event, setEvent] = useState<Event>();
  const [relevance, setRelevance] = useState<events[]>([]);
  const { backgroundWindow, setBackgroundWindow } = useContext(BackgroundWindow);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const { setMapClickedPosition } = useContext(MapClickedPosition);

  const search = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

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

  const createRelation = async () => {
    // const token = Cookie.get('token');
    // if (token) {
    //   try {
    //     await api.get(`/subscribe/${params.id}`, {
    //       headers: {
    //         Authorization: token,
    //       },
    //     });
    //     router.refresh();
    //     alert('Evento Curtido!');
    //   } catch (error) {
    //     router.refresh();
    //     alert('Ocorreu um erro ao curtir o evento.');
    //   }
    // } else {
    //   router.push('/signin');
    //   alert('Você precisa estar conectado para curtir um evento.');
    // }
  };

  const nextEvent = (event: events) => {
    router.push(`/events/${event?._id}`);
  };

  useEffect(() => {
    if (params.id) {
      setBackgroundWindow(true);
      (async () => {
        try {
          const response = await api.get(`/events/${params.id}`);
          if (response) {
            setEvent(response.data);
          }
        } catch (error) {
          router.push('/');
        }
      })();
    }
  }, [params.id]);

  useEffect(() => {
    if (event?._id) {
      maps!.setCenter({
        lat: event.point.coordinates[1],
        lng: event.point.coordinates[0],
      });
      maps!.setZoom(15);
    }
  }, [event?._id]);

  useEffect(() => {
    if (point.lat) {
      handleInfoWindow();
    }
  }, [point.lat | point.lng]);

  useEffect(() => {
    if (pathname === `/events/${params.id}`) {
      (async () => {
        try {
          const response = await api.get(`/subscribed/${params.id}`);
          setRelevance(response.data);
        } catch (error) {
          alert('Erro no servidor, tente novamente mais tarde.');
        }
      })();
    }
  }, [pathname]);

  return (
    <>
      {!event && backgroundWindow && (
        <div
          className="z-[2] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] p-10 border-gray-800 border bg-gray-900 text-center rounded-xl 
          shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-xs"
        >
          Aguarde um momento....
        </div>
      )}
      {backgroundWindow && event && (
        <div
          className="z-[2] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] p-10 border-gray-800 border bg-gray-900 text-center rounded-xl 
          shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-2xl"
        >
          <h1 className="uppercase font-alt text-xl font-bold flex justify-center">
            <ClipboardType className="text-blue-700 mr-2" /> {event.title}
          </h1>
          <div className="mt-5 flex flex-col overflow-y-auto items-center">
            <div className="flex space-x-2">
              <p className="font-bold">Data:</p>
              <p>{`${dayjs(event.startDate).utc().format('DD[/]MM[/]YYYY')}`}</p>
              <p>~</p>
              <p>{`${dayjs(event.endDate).utc().format('DD[/]MM[/]YYYY')}`}</p>
            </div>
            <div className="mt-3 h-96 overflow-y-auto max-w-xl">
              <p>{`${event.description}`}</p>
            </div>
            <button
              onClick={createRelation}
              className="flex flex-col items-center mt-3 cursor-pointer text-green-600 hover:text-green-500 border-green-600 hover:border-green-500 border rounded-xl px-2 py-1 "
            >
              <ThumbsUpIcon />
              <p>Curtir</p>
            </button>
            <div className="mt-3 flex items-center space-x-3 border-b-[.5px] border-slate-600 pb-2">
              <Link
                href={`/events/remove/${event._id}`}
                className="bg-red-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-red-800 
              active:border-red-400 rounded-lg relative px-10 py-2 "
              >
                Remover
              </Link>
              <Link
                href={`/events/update/${event._id}`}
                onClick={() => setMapClickedPosition(undefined)}
                className="bg-yellow-600 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-yellow-700 
              active:border-yellow-400 rounded-lg relative px-10 py-2"
              >
                Editar
              </Link>
              <Link
                href={`/events/${event._id}/?lat=${event.point.coordinates[1]}&lng=${event.point.coordinates[0]}`}
                onClick={() => {
                  setBackgroundWindow(false);
                  setMapClickedPosition(undefined);
                }}
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
              active:border-blue-400 rounded-lg relative px-10 py-2"
              >
                Voltar
              </button>
            </div>
            <div className="mt-3 border-b-[.5px] border-slate-600 pb-2">
              <p className="mb-2">Quem curtiu esse também curtiu esses outros:</p>
              {relevance.length > 0 ? (
                <ul className="flex gap-5">
                  {relevance.map((event) => {
                    return (
                      <li className="bg-sky-800 hover:bg-sky-700 p-1 px-2 rounded" key={event._id}>
                        <button onClick={() => nextEvent(event)}>{event.title}</button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="italic text-gray-400">Não há relevância</p>
              )}
            </div>
            <div className="mt-4">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 font-bold hover:underline flex flex-col items-center"
                style={{ textShadow: '2px 0px 2px black' }}
              >
                <Home />
                Página Inicial
              </a>
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
