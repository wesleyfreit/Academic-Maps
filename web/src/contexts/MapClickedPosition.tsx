import { createContext } from 'react';

interface Props {
  mapClickedPosition: { lat: number; lng: number } | undefined;
  setMapClickedPosition: (value: { lat: number; lng: number } | undefined) => void;
}

const MapClickedPosition = createContext<Props>({
  mapClickedPosition: undefined,
  setMapClickedPosition: (value: { lat: number; lng: number } | undefined) => {},
});

export default MapClickedPosition;
