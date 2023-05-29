'use client';

import locationMarkerOptions from '@/configs/MarkerOptions';
import { center } from '@/configs/mapOptions';
import MapCenter from '@/contexts/MapCenter';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';

export default function UserLocation() {
  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(false); //Janela de informação de marcadores
  const { centerMap, setCenterMap } = useContext(MapCenter);

  // Configuração da busca por localização em tempo real
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenterMap({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      {/* Marcador com a localização do usuário */}
      {centerMap != center && (
        <Marker
          position={centerMap}
          onClick={() => setInfoWindowOpen(true)}
          options={{
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              ...locationMarkerOptions,
            },
          }}
        />
      )}
      {/* InfoWindow do marcador de localização atual */}
      {infoWindowOpen && centerMap && (
        <InfoWindow position={centerMap} onCloseClick={() => setInfoWindowOpen(false)}>
          <div className="text-black font-sans">Localização atual</div>
        </InfoWindow>
      )}
    </div>
  );
}
