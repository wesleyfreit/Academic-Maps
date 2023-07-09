'use client';

import BackgroundWindow from '@/contexts/BackgroundWindow';
import { ReactNode, useState } from 'react';

export default function ViewBackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundWindow, setBackgroundWindow] = useState(false);

  return (
    <BackgroundWindow.Provider value={{ backgroundWindow, setBackgroundWindow }}>
      <div className="flex items-center justify-center w-screen h-screen">
        {backgroundWindow && (
          <div className="w-screen h-screen absolute z-[1] flex justify-center items-center bg-black bg-opacity-30" />
        )}
        <div className="relative">{children}</div>
      </div>
    </BackgroundWindow.Provider>
  );
}
