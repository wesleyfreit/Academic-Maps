'use client';

import { ReactNode, useContext, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

import UserLocationPoint from '@/contexts/UserLocationPoint';
import MapClickedPosition from '@/contexts/MapClickedPosition';
import BackgroundWindow from '@/contexts/BackgroundWindow';

import { center, mapOptions } from '../../configs/mapOptions';

export default function GoogleMaps({ children }: { children: ReactNode }) {
  const { setBackgroundWindow } = useContext(BackgroundWindow);
  const [userLocationPoint, setUserLocationPoint] = useState(center);
  const { mapClickedPosition, setMapClickedPosition } = useContext(MapClickedPosition);
  

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      if (mapClickedPosition) setMapClickedPosition(undefined);
      else {
        setMapClickedPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        setBackgroundWindow(true);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <UserLocationPoint.Provider value={{ userLocationPoint, setUserLocationPoint }}>
        <GoogleMap // Gerando o mapa
          mapContainerStyle={{ width: '100vw', height: '100vh' }}
          options={{
            mapTypeControlOptions: {
              position: google.maps.ControlPosition.TOP_RIGHT,
            },
            streetViewControlOptions: {
              position: google.maps.ControlPosition.TOP_RIGHT,
            },
            ...mapOptions,
          }}
          zoom={15}
          center={userLocationPoint || center}
          onClick={handleMapClick}
        >
          
          {children}
        </GoogleMap>
      </UserLocationPoint.Provider>
    </div>
  );
}
