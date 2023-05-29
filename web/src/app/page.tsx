import ListEvents from '@/components/List/EventsList';
import { GoogleMaps } from '@/components/Maps/GoogleMaps';
import UserLocation from '@/components/Markers/UserLocation';
import SearchBar from '@/components/Menu/SearchBar';
import ViewSearchResults from '@/components/Windows/ViewSearchResults';

export default function Home() {
  return (
    <GoogleMaps>
      <ListEvents />
      <ViewSearchResults>
        <SearchBar />
      </ViewSearchResults>
      <UserLocation />
    </GoogleMaps>
  );
}
