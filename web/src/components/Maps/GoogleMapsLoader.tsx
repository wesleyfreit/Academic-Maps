import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect } from "react";

interface Props {
  onLoad: () => void;
  googleMapsApiKey: string;
}

export default function GoogleMapsLoader(props: Props) {
    const {onLoad, googleMapsApiKey} = props;

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey,
    });

    useEffect(() => {
        if (isLoaded) {
            onLoad();
        }
    }, [isLoaded, onLoad]);

    return null;
}
