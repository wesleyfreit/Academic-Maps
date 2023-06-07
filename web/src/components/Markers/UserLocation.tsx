'use client';

import { InfoWindow, Marker, useGoogleMap } from '@react-google-maps/api';
import { useContext, useEffect, useState } from 'react';

import UserLocationPoint from '@/contexts/UserLocationPoint';

import locationMarkerOptions from '@/configs/MarkerOptions';
import { center } from '@/configs/mapOptions';

export default function UserLocation() {
  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(false); //Janela de informação de marcadores
  const { userLocationPoint, setUserLocationPoint } = useContext(UserLocationPoint);

  const maps = useGoogleMap();

  const handleUserLocationPoint = () => {
    maps!.setCenter(userLocationPoint);
    maps!.setZoom(18);
    setInfoWindowOpen(true);
  };

  // Configuração da busca por localização em tempo real
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocationPoint({ lat: latitude, lng: longitude });
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
    <>
      {/* Marcador com a localização do usuário */}
      {userLocationPoint != center && (
        <Marker
          position={userLocationPoint}
          onClick={handleUserLocationPoint}
          options={{
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              ...locationMarkerOptions,
            },
          }}
        />
      )}
      {/* InfoWindow do marcador de localização atual */}
      {infoWindowOpen && userLocationPoint && (
        <InfoWindow position={userLocationPoint} onCloseClick={() => setInfoWindowOpen(false)}>
          <div className="text-black font-sans">Localização atual</div>
        </InfoWindow>
      )}
    </>
  );
}
