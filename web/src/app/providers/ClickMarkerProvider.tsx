'use client';

import MapClickedPosition from '@/contexts/MapClickedPosition';
import GoogleMapsLoader from '@/lib/auth';
import { ReactNode, useState } from 'react';

export default function ClickMarkerProvider({ children }: { children: ReactNode }) {
  const isLoaded = GoogleMapsLoader();
  const [mapClickedPosition, setMapClickedPosition] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  return (
    <MapClickedPosition.Provider value={{ mapClickedPosition, setMapClickedPosition }}>
      {isLoaded && <>{children}</>}
    </MapClickedPosition.Provider>
  );
}
