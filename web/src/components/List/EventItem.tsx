import { InfoWindow, Marker } from '@react-google-maps/api';
import ptBr from 'dayjs/locale/pt-br';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { ArrowRightFromLine } from 'lucide-react';
import { Event } from '@/configs/Interfaces';

dayjs.locale(ptBr);

interface Props {
  setCenterWindow: (value: google.maps.LatLngLiteral | null) => void;
  onClose: () => void;
  event: Event;
}

export default function EventItem(props: Props) {
  const { event } = props;
  const { onClose, setCenterWindow } = props;

  const Point = {
    lat: event.point.coordinates[1],
    lng: event.point.coordinates[0],
  };

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const handleInfoWindow = () => {
    if (infoWindowOpen) setInfoWindowOpen(false);
    else setInfoWindowOpen(true);
  };

  const closeAndView = () => {
    setCenterWindow(Point)
    handleInfoWindow();
    onClose();
  };

  return (
    <>
      <li className="bg-gray-700 rounded-md px-4 py-1 m-0 flex items-center justify-between hover:bg-gray-600 cursor-pointer">
        <div title="Visualizar evento">
          <h2 className="flex font-alt">
            {event.title.length > 20 ? event.title.substring(0, 20).concat('...') : event.title}
          </h2>
          <p>{dayjs(event.startDate).format('DD[/]MM[/]YYYY')}</p>
        </div>
        <div title="Visualizar ponto">
          <ArrowRightFromLine
            className="ml-3 bg-gray-800 rounded-full p-2 h-8 w-12 hover:bg-gray-900"
            onClick={closeAndView}
          />
        </div>
        <Marker position={Point} onClick={handleInfoWindow} />
        {infoWindowOpen && (
          <InfoWindow
            position={Point}
            onCloseClick={handleInfoWindow}
            options={{ pixelOffset: new google.maps.Size(0, -30) }}
          >
            <div className="text-black font-alt">{event.title}</div>
          </InfoWindow>
        )}
      </li>
    </>
  );
}
