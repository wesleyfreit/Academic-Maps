'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { center, mapOptions } from '../configs/mapOptions';
import { useState } from 'react';
import { BackgroundWindow } from './BackgroundWindow';
import WarningCreateEvent from './WarningCreateEvent';
import FormCreateEvent from './FormCreateEvent';
import UserLocation from './UserLocation';

export function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_MAP_KEY}`,
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
          options={mapOptions}
          zoom={15}
          center={userPosition || center}
          onClick={handleMapClick}
        >
          <UserLocation selectUserPostion={setUserPosition} />
          {clickPosition
            ? clickPosition && (
                <Marker position={clickPosition}>
                  <BackgroundWindow onClose={setClickPosition}>
                    <WarningCreateEvent
                      onClose={setClickPosition}
                      selectedPosition={clickPosition}
                      isSelect={setClickForm}
                    />
                  </BackgroundWindow>
                </Marker>
              )
            : null}
          {clickForm ? (
            <BackgroundWindow onClose={setClickForm}>
              <FormCreateEvent selectedPosition={clickForm} />
            </BackgroundWindow>
          ) : null}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}
