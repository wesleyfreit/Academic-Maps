import { ClipboardType } from 'lucide-react';
import React from 'react';

interface Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description: Text;
}

export default function ViewEvent(props: Event) {
  const { id, title, startDate, endDate, description } = props;

  return (
    <>
      <div className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-lg">
        <h1 className="uppercase font-alt text-xl font-bold flex justify-center">
          {' '}
          <ClipboardType className="text-blue-700 mr-2" /> Criação do Evento
        </h1>
        <div className="mt-5 flex flex-col overflow-y-auto">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Título"
            className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400"
          />
          <div className="mt-4 relative">{/* DATA */}</div>
          <textarea
            name="description"
            id="description"
            spellCheck={false}
            className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400 mt-5 resize-none h-52"
            placeholder="Adicione uma breve descrição do evento"
          />
          <div className="mt-5 w-full h-full flex justify-center">
            <button
              type="submit"
              className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 active:border-blue-400 rounded-lg relative px-10 py-2 "
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
