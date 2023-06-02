import { Event } from '@/configs/Interfaces';
import { ClipboardType } from 'lucide-react';
import React from 'react';
import ViewBackground from '../../app/providers/ViewBackgroundProvider';
import dayjs from 'dayjs';
interface Props {
  event: Event;
  onClose: (value: boolean) => void;
}

export default function ViewEvent(props: Props) {
  const { event, onClose } = props;

  return (
    <>
      <div
        className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 
        shadow-lg drop-shadow-2xl w-screen max-w-2xl"
      >
        <h1 className="uppercase font-alt text-xl font-bold flex justify-center">
          <ClipboardType className="text-blue-700 mr-2" /> {event.title}
        </h1>
        <div className="mt-5 flex flex-col overflow-y-auto items-center">
          <div className="flex space-x-2">
            <p className="font-bold">Data:</p>
            <p>{`${dayjs(event.startDate).format('DD[/]MM[/]YYYY')}`}</p>
            <p>~</p>
            <p>{`${dayjs(event.endDate).format('DD[/]MM[/]YYYY')}`}</p>
          </div>
          <div className="mt-3 h-96 overflow-y-auto">
            <p>{`${event.description}`}</p>
          </div>
          <div className="mt-5 flex justify-center space-x-3">
            <button
              onClick={() => onClose(false)}
              className="bg-red-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-red-800 
              active:border-red-400 rounded-lg relative px-10 py-2 "
            >
              Deletar
            </button>
            <button
              onClick={() => onClose(false)}
              className="bg-yellow-600 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-yellow-700 
              active:border-yellow-400 rounded-lg relative px-10 py-2"
            >
              Editar
            </button>
            <button
              onClick={() => onClose(false)}
              className="bg-green-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-green-800 
              active:border-green-400 rounded-lg relative px-10 py-2 "
            >
              Ver Mapa
            </button>
            <button
              onClick={() => onClose(false)}
              className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 
              active:border-blue-400 rounded-lg relative px-10 py-2 "
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
