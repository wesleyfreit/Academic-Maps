'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { Map } from 'lucide-react';

import MapClickedPosition from '@/contexts/MapClickedPosition';
import BackgroundWindow from '@/contexts/BackgroundWindow';

interface Props {
  setOpenWarning: boolean;
}

export default function ViewWarningCreateEvent(props: Props) {
  const { setOpenWarning } = props;
  const { mapClickedPosition } = useContext(MapClickedPosition);
  const { backgroundWindow, setBackgroundWindow } = useContext(BackgroundWindow);
  const [closeWindow, setCloseWindow] = useState(!setOpenWarning);

  const handleBackgroundWindow = () => {
    setBackgroundWindow(false);
  };

  return (
    <>
      {!closeWindow && backgroundWindow && (
        <div className="z-[2] relative w-fit left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl ">
            <h1 className="uppercase font-alt text-lg font-bold flex justify-center">
              <Map className="text-green-700 mr-2" /> Localização Selecionada
            </h1>
            <p className="mt-3">Deseja cadastrar esta localização em um evento?</p>
            <div className="mt-5 w-full h-full flex items-center justify-center space-x-10 ">
              <Link
                href={`/events/new?lat=${mapClickedPosition?.lat}&lng=${mapClickedPosition?.lng}`}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow-gray-950 shadow-sm outline-none border border-transparent active:border-green-400"
                onClick={() => setCloseWindow(true)}
              >
                Sim
              </Link>
              <button
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg shadow-gray-950 shadow-sm outline-none border border-transparent active:border-red-400"
                onClick={handleBackgroundWindow}
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
