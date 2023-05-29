import ListEvents from '@/components/List/EventsList';
import { GoogleMaps } from '@/components/Maps/GoogleMaps';
import UserLocation from '@/components/Markers/UserLocation';
import SearchBar from '@/components/Menu/SearchBar';

export default function Home() {
  return (
    <GoogleMaps>
      <ListEvents />
      <SearchBar />
      <UserLocation />
    </GoogleMaps>
  );
}
