import { Map } from 'lucide-react';
import React from 'react';

interface Props {
  onClose: (value: boolean) => void;
  selectIsTrue: (value: boolean) => void;
}

export default function WarningCreateEvent(props: Props) {
  const { onClose, selectIsTrue } = props;

  const handleClose = () => {
    onClose(false);
  }

  const handleSelect = () => {
    selectIsTrue(true);
    onClose(true);
  }

  return (
    <div className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl ">
      <h1 className="uppercase font-alt text-lg font-bold flex justify-center">
        <Map className="text-green-700 mr-2" /> Localização Selecionada
      </h1>
      <p className="mt-3">Deseja cadastrar esta localização em um evento?</p>
      <div className="mt-5 w-full h-full flex items-center justify-center space-x-10 ">
        <button
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow-gray-950 shadow-sm outline-none border border-transparent active:border-green-400"
          onClick={handleSelect}
        >
          Sim
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg shadow-gray-950 shadow-sm outline-none border border-transparent active:border-red-400"
          onClick={handleClose}
        >
          Não
        </button>
      </div>
    </div>
  );
}
