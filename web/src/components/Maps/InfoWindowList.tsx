import { InfoWindow } from '@react-google-maps/api';

export default function InfoWindowList(props: {
  point: { lat: number; lng: number };
  title: string;
  handleInfoWindow: () => void;
  infoWindowOpen: boolean;
}) {
  const { point, title, handleInfoWindow, infoWindowOpen } = props;

  return (
    <>
      {infoWindowOpen && (
        <InfoWindow
          key={`${point.lat}-${point.lng}`}
          position={point}
          onCloseClick={handleInfoWindow}
          options={{ pixelOffset: new google.maps.Size(0, -30) }}
        >
          <div className="text-black">{title}</div>
        </InfoWindow>
      )}
    </>
  );
}
