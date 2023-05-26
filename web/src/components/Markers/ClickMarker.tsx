import { Marker } from '@react-google-maps/api';
import { useState } from 'react';
import BackgroundWindow from '../Windows/BackgroundWindow';
import WarningCreateEvent from '../Warnings/WarningCreateEvent';
import FormCreateEvent from '../Forms/FormCreateEvent';

interface Props {
  position: google.maps.LatLngLiteral | null;
  setPosition: (value: null) => void;
  setBackdropOpen: boolean;
}

export default function ClickMarker(props: Props) {
  const { position, setBackdropOpen, setPosition } = props;

  const [backdrop, setBackdrop] = useState(setBackdropOpen);
  const [isTrue, setIsTrue] = useState(false);

  return (
    <>
      {position && (
        <Marker position={position} onClick={() => setBackdrop(true)}>
          {backdrop && (
            <BackgroundWindow onClose={setBackdrop}>
              {!isTrue && <WarningCreateEvent onClose={setBackdrop} selectIsTrue={setIsTrue} />}
              {isTrue && <FormCreateEvent position={position} onClose={setBackdrop} />}
            </BackgroundWindow>
          )}
        </Marker>
      )}
    </>
  );
}
