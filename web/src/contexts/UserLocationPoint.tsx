// use client

import { center } from '@/configs/mapOptions';
import { createContext } from 'react';

const UserLocationPoint = createContext({
  userLocationPoint: center,
  setUserLocationPoint: (value: { lat: number; lng: number }) => {},
});

export default UserLocationPoint;
