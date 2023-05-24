'use client';

import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import mapOptions from '../configs/mapOptions';
import { useEffect, useState } from 'react';
import locationInfoWindowOptions from '../configs/infoWindowOptions';
import locationMarkerOptions from '@/configs/MarkerOptions';

export function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_MAP_KEY}`,
  });

  const center = { lat: -6.888463202449027, lng: -38.558930105104125 };

  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(false);
  const [clickPosition, setClickPosition] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      if (clickPosition) setClickPosition(null);

      setClickPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  return (
    <div className="w-screen h-screen">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={mapOptions}
          zoom={15}
          center={userPosition || center}
          onClick={handleMapClick}
        >
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
          {clickPosition ? clickPosition && <Marker position={clickPosition} /> : null}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}
