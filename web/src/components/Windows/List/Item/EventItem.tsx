import { Marker } from '@react-google-maps/api';
import utc from 'dayjs/plugin/utc';
import { useContext } from 'react';
import dayjs from 'dayjs';
import { Event } from '@/configs/Interfaces';
import { useRouter } from 'next/navigation';
import BackgroundWindow from '@/contexts/BackgroundWindow';

dayjs.extend(utc);

interface Props {
  event: Event;
  onClose: () => void;
  openMenu: boolean;
}

export default function EventItem(props: Props) {
  const { event, onClose, openMenu } = props;
  const { setBackgroundWindow } = useContext(BackgroundWindow);

  const router = useRouter();

  const point = {
    lat: event.point.coordinates[1],
    lng: event.point.coordinates[0],
  };

  const closeAndViewEvent = () => {
    setBackgroundWindow(true);
    if (openMenu) onClose();
    router.push(`/events/${event?._id}`);
  };

  const viewPoint = () => {
    router.push(`/events/${event?._id}/?lat=${point.lat}&lng=${point.lng}`);
  };

  return (
    <>
      <li
        className="bg-gray-700 rounded-md px-4 py-1 m-0 flex items-center justify-between hover:bg-gray-600 cursor-pointer"
        onClick={closeAndViewEvent}
      >
        <div title="Visualizar evento">
          <h2 className="flex font-alt">
            {event.title}
          </h2>
          <p>
            {dayjs(event.startDate).utc().format('DD[/]MM[/]YYYY')} ~
            {dayjs(event.endDate).utc().format('DD[/]MM[/]YYYY')}
          </p>
        </div>
        <Marker
          label={event.title.substring(0, 2)}
          position={point}
          onClick={viewPoint}
          title={event.title}
        />
      </li>
    </>
  );
}
