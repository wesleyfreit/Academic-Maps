import locationMarkerOptions from '@/configs/MarkerOptions';
import locationInfoWindowOptions from '@/configs/infoWindowOptions';
import { InfoWindow, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

interface Props {
  selectUserPostion: (value: google.maps.LatLngLiteral) => void;
}

export default function UserLocation(props: Props) {
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null); //Localização Real
  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(false); //Janela de informação de marcadores

  const { selectUserPostion } = props;

  // Configuração da busca por localização em tempo real
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserPosition({ lat: latitude, lng: longitude });
          selectUserPostion({ lat: latitude, lng: longitude });
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
      {userPosition && (
        <Marker
          position={userPosition}
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
      {infoWindowOpen && userPosition && (
        <InfoWindow
          position={userPosition}
          onCloseClick={() => setInfoWindowOpen(false)}
          options={locationInfoWindowOptions}
        >
          <div className="text-black font-sans">Localização atual</div>
        </InfoWindow>
      )}
    </div>
  );
}
