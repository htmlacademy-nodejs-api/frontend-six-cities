import { Icon, Marker } from 'leaflet';
import { useRef, useEffect } from 'react';

import type { City, Location } from '../../types/types';

import { URL_MARKER_DEFAULT, ZOOM } from '../../const';
import useMap from '../../hooks/useMap';

type LocationPickerProps = {
  city: City;
  onChange: ({ lat, lng }: { lat: number; lng: number }) => void;
  location: Location;
};

const customIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const LocationPicker = ({ city, onChange, location }: LocationPickerProps) => {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    let marker: Marker;
    if (map) {
      map.setView(
        {
          lat: location.latitude,
          lng: location.longitude,
        },
        ZOOM
      );

      marker = new Marker(
        {
          lat: location.latitude,
          lng: location.longitude,
        },
        {
          draggable: true,
          icon: customIcon,
        }
      );

      marker.on('moveend', (evt) => {
        onChange(evt.target.getLatLng());
      });

      marker.addTo(map);
    }

    return () => {
      if (map) {
        map.removeLayer(marker);
      }
    };
  }, [map, location, onChange]);

  return <section className="location-picker__map" ref={mapRef}></section>;
};

export default LocationPicker;
