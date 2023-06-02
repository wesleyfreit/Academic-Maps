'use client';

import React, { useState } from 'react';
import { Event } from '@/configs/Interfaces';
import dayjs from 'dayjs';
import ViewEvent from '../Windows/ViewEvent';
import BackgroundWindow from '../../app/providers/ViewBackgroundProvider';

interface Props {
  event: Event;
}

export default function ViewEventResult(props: Props) {
  const { event } = props;
  const [viewEvent, setViewEvent] = useState(false);

  return (
    <>
      <li className="flex justify-center">
        <div
          title="Visualizar evento"
          className="text-center bg-gray-700 rounded-md py-1 w-full hover:bg-gray-600 cursor-pointer"
          onClick={() => setViewEvent(true)}
        >
          <h2 className="font-alt text-lg font-semibold">{event.title}</h2>
          <p>
            {dayjs(event.startDate).format('DD[/]MM[/]YYYY')} ~
            {dayjs(event.endDate).format('DD[/]MM[/]YYYY')}
          </p>
        </div>
        {viewEvent && (
          <div className="absolute transform translate-x-[1%] -translate-y-[12%] h-full w-full m-0 top-0">
            <BackgroundWindow onClose={setViewEvent}>
              <ViewEvent event={event} onClose={setViewEvent} />
            </BackgroundWindow>
          </div>
        )}
      </li>
    </>
  );
}
