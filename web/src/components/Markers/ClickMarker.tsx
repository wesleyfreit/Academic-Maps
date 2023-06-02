'use client';

import React, { useContext, useState } from 'react';
import { Marker } from '@react-google-maps/api';

import MapClickedPosition from '@/contexts/MapClickedPosition';
import BackgroundWindow from '@/contexts/BackgroundWindow';

import ViewWarningCreateEvent from '../Windows/ViewWarningCreateEvent';

export default function ClickMarker() {
  const [openWarning, setOpenWarning] = useState(false);
  const { mapClickedPosition } = useContext(MapClickedPosition);
  const { setBackgroundWindow } = useContext(BackgroundWindow);

  const handleOpenWarning = () => {
    setBackgroundWindow(true);
    setOpenWarning(true);
  };

  return (
    <>
      {mapClickedPosition && (
        <Marker
          position={mapClickedPosition}
          draggable={true}
          onLoad={() => setOpenWarning(true)}
          onClick={handleOpenWarning}
        >
          {openWarning && <ViewWarningCreateEvent setOpenWarning={openWarning} />}
        </Marker>
      )}
    </>
  );
}
