'use client';

import { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { center, mapOptions } from '../configs/mapOptions';

import ListEvents from './Menu/EventsList';
import UserLocation from './Markers/UserLocation';
import ClickMarker from './Markers/ClickMarker';

export function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_MAP_KEY}`,
  }); // Iniciando o GOOGLE MAPS API

  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null); //Localização Real
  const [clickedPosition, setClickPosition] = useState<google.maps.LatLngLiteral | null>(null); //Marcador
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null) // Mudando a posição do centro para o da infoWindow selecionada

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      if (clickedPosition) setClickPosition(null);
      else setClickPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {isLoaded && (
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
          center={selectedPosition || userPosition || center}
          onClick={handleMapClick}
        >
          {/* Lista de Eventos */}
          <ListEvents setCenter={setSelectedPosition} /> {/* Lista de Eventos */}
          <UserLocation selectUserPostion={setUserPosition} /> {/* Localização do usuário */}
          {clickedPosition && (
            <ClickMarker // Enviando uma solicitação para criar um marcador no mapa
              position={clickedPosition}
              setPosition={setClickPosition}
              setBackdropOpen={true}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
}
