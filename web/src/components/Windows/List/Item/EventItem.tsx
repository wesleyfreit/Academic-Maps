import { InfoWindow, Marker } from '@react-google-maps/api';
import ptBr from 'dayjs/locale/pt-br';
import { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { ArrowRightFromLine } from 'lucide-react';
import { Event } from '@/configs/Interfaces';
import { useRouter } from 'next/navigation';
import BackgroundWindow from '@/contexts/BackgroundWindow';

dayjs.locale(ptBr);

interface Props {
  event: Event;
  onClose: () => void;
  openMenu: boolean;
}

export default function EventItem(props: Props) {
  const { event, onClose, openMenu } = props;
  const { setBackgroundWindow } = useContext(BackgroundWindow);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const router = useRouter();

  const Point = {
    lat: event.point.coordinates[1],
    lng: event.point.coordinates[0],
  };

  const closeAndViewEvent = () => {
    setBackgroundWindow(true);
    if (openMenu) onClose();
    handleInfoWindow();
    router.push(`/events/${event?.id}`);
    router.push(`/events/${event?.id}/?lat=${Point.lat}&lng=${Point.lng}`);
  };

  const handleInfoWindow = () => {
    if (infoWindowOpen) {
      setInfoWindowOpen(false);
      router.push('/')
    } else setInfoWindowOpen(true);
  };

  return (
    <>
      <li
        className="bg-gray-700 rounded-md px-4 py-1 m-0 flex items-center justify-between hover:bg-gray-600 cursor-pointer"
        onClick={closeAndViewEvent}
      >
        <div title="Visualizar evento">
          <h2 className="flex font-alt">
            {event.title.length > 20 ? event.title.substring(0, 20).concat('...') : event.title}
          </h2>
          <p>{dayjs(event.startDate).format('DD[/]MM[/]YYYY')}</p>
        </div>
        <div title="Visualizar ponto">
          <ArrowRightFromLine className="ml-3 bg-gray-800 rounded-full p-2 h-8 w-12 hover:bg-gray-900" />
        </div>
        <Marker position={Point} onClick={closeAndViewEvent} title={event.title} />
        {infoWindowOpen && (
          <InfoWindow
            key={`${Point.lat}-${Point.lng}`}
            position={Point}
            onCloseClick={handleInfoWindow}
            options={{ pixelOffset: new google.maps.Size(0, -30) }}
          >
            <div className="text-black">{event.title}</div>
          </InfoWindow>
        )}
      </li>
    </>
  );
}
