'use client';

import { useContext, useEffect, useState } from 'react';
import { XSquare } from 'lucide-react';

import BackgroundWindow from '@/contexts/BackgroundWindow';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function ViewWarningCreateEvent() {
  const { backgroundWindow, setBackgroundWindow } = useContext(BackgroundWindow);
  const [id, setId] = useState<number>(NaN);

  const router = useRouter();
    const params = useParams();

  useEffect(() => {
    if (params.id) {
      (async () => {
        try {
          const response = await api.get(`/events/${params.id}`);
          const event = response.data;
          setId(event._id);
        } catch (error) {
          alert('Erro ao consultar o servidor.');
          router.push('/');
        }
      })();
    }
  }, [params.id]);

  const handleRemoveEvent = async () => {
    if(isNaN(id)){
      try {
        const response = await api.delete(`/events/${id}`);
        if(response){
          setBackgroundWindow(false);
          router.push('/');
        }
      } catch (error) {
        alert('Erro ao remover o evento, tente novamente mais tarde.');
        router.push('/');
      }
    }
  };

  return (
    <>
      {backgroundWindow && (
        <div className="z-[2] relative w-fit left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl ">
            <h1 className="uppercase font-alt text-lg font-bold flex justify-center">
              <XSquare className="text-red-700 mr-2" /> Remoção de Evento
            </h1>
            <p className="mt-3">Tem certeza que deseja remover este evento?</p>
            <div className="mt-5 w-full h-full flex items-center justify-center space-x-10 ">
              <button
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow-gray-950 shadow-sm outline-none border border-transparent active:border-green-400"
                onClick={handleRemoveEvent}
              >
                Sim
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg shadow-gray-950 shadow-sm outline-none border border-transparent active:border-red-400"
                onClick={() => router.back()}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
