'use client';

import { ReactNode, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

import GoogleMapsLoader from '@/lib/auth';
import MapCenter from '@/contexts/MapCenter';

import { center, mapOptions } from '../../configs/mapOptions';

import ClickMarker from '../Markers/ClickMarker';

export function GoogleMaps({ children }: { children: ReactNode }) {
  const isLoaded = GoogleMapsLoader();

  const [clickedPosition, setClickPosition] = useState<google.maps.LatLngLiteral | null>(null); //Marcador
  const [centerMap, setCenterMap] = useState(center);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      if (clickedPosition) setClickPosition(null);
      else setClickPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {isLoaded && (
        <MapCenter.Provider value={{ centerMap, setCenterMap }}>
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
            center={centerMap}
            onClick={handleMapClick}
          >
            {clickedPosition && (
              <ClickMarker // Enviando uma solicitação para criar um marcador no mapa
                position={clickedPosition}
                setBackdropOpen={true}
              />
            )}
            {children}
          </GoogleMap>
        </MapCenter.Provider>
      )}
    </div>
  );
}
