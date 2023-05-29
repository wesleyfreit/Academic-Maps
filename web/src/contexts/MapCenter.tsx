import { center } from '@/configs/mapOptions';
import { createContext } from 'react';

const MapCenter = createContext({
  centerMap: center,
  setCenterMap: (value: { lat: number; lng: number }) => {},
});

export default MapCenter;
