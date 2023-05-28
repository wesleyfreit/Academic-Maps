import { useJsApiLoader } from '@react-google-maps/api';

export default function GoogleMapsLoader() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY || '',
  });

  if (isLoaded) {
    return isLoaded;
  }
  return null;
}
