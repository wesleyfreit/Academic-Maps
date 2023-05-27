'use client';

import { useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';

import { center, mapOptions } from '../../configs/mapOptions';
import ListEvents from '../List/EventsList';
import UserLocation from '../Markers/UserLocation';
import ClickMarker from '../Markers/ClickMarker';
import GoogleMapsLoader from './GoogleMapsLoader';
import { api } from '@/lib/api';

export function GoogleMaps() {
  const [mapKey, setMapKey] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  //Obtendo a chave da Api
  useEffect(() => {
    (async () => {
      if (mapKey === '') {
        try {
          const response = await api.get('/config');
          setMapKey(response.data);
        } catch (error) {}
      }
    })();
  }, []);

  const handleIsLoaded = () => {
    setIsLoaded(true);
  };

  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null); //Localização Real
  const [clickedPosition, setClickPosition] = useState<google.maps.LatLngLiteral | null>(null); //Marcador
  const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null); // Mudando a posição do centro para o do marcador selecionado

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      if (clickedPosition) setClickPosition(null);
      else setClickPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {mapKey !== '' && <GoogleMapsLoader googleMapsApiKey={mapKey} onLoad={handleIsLoaded} />}
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
