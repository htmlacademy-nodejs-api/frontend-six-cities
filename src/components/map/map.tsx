import { useRef, useEffect } from 'react';
import { Icon, Marker } from 'leaflet';

import type { City, Location } from '../../types/types';

import useMap from '../../hooks/useMap';
import {
  CityLocation,
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
  ZOOM
} from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  locations: (Location & { id?: string })[];
  activeOffer?: null | string;
  place?: 'cities' | 'property' | 'form';
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const Map = ({
  city,
  locations,
  activeOffer,
  place = 'cities',
}: MapProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      locations.forEach(({ id, latitude: lat, longitude: lng }) => {
        const marker = new Marker({
          lat,
          lng,
        });

        marker
          .setIcon(activeOffer === id ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);

        markers.push(marker);
      });

      const { latitude: lat, longitude: lng } = CityLocation[city.name];
      map.setView({ lat, lng }, ZOOM);
    }

    return () => {
      if (map) {
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map, city, locations, activeOffer]);

  return <section className={`${place}__map map`} ref={mapRef} />;
};

export default Map;
