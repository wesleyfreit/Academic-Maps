'use client';

import { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { center, mapOptions } from '../configs/mapOptions';
import { BackgroundWindow } from './BackgroundWindow';
import WarningCreateEvent from './WarningCreateEvent';
import FormCreateEvent from './FormCreateEvent';
import UserLocation from './UserLocation';
import ListEvents from './ListEvents';

export function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_MAP_KEY || ''}`,
  }); // Iniciando o GOOGLE MAPS API

  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null); //Localização Real

  const [clickPosition, setClickPosition] = useState<google.maps.LatLngLiteral | null>(null); //Marcador
  const [clickForm, setClickForm] = useState<google.maps.LatLngLiteral | null>(null); // Localização do marcador selecionado p/ criação do evento

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      if (clickPosition) setClickPosition(null);
      else setClickPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  }; //Setando marcadores no mapa

  return (
    <div className="w-screen h-screen flex">
      {isLoaded ? (
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
          center={userPosition || center}
          onClick={handleMapClick}
        >
          {/* Lista de Eventos */}
          <ListEvents />
          <UserLocation selectUserPostion={setUserPosition} /> {/* Localização do usuário */}
          {/* Setando marcador ao mapa, abrindo janela de pergunta sobre criar evento */}
          {clickPosition ? (
            <Marker position={clickPosition}>
              <BackgroundWindow onClose={setClickPosition}>
                <WarningCreateEvent
                  onClose={setClickPosition}
                  selectedPosition={clickPosition}
                  isSelect={setClickForm}
                />
              </BackgroundWindow>
            </Marker>
          ) : null}
          {/* Se for selecionado "sim" acima, será aberto o formulário de criação de evento */}
          {clickForm ? (
            <Marker position={clickForm}>
              <BackgroundWindow onClose={setClickForm}>
                <FormCreateEvent selectedPosition={clickForm} />
              </BackgroundWindow>
            </Marker>
          ) : null}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}
