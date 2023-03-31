import {useRef, useEffect} from 'react';
import {Icon} from 'leaflet';
import useMap from '../../hooks/useMap/useMap';
import {Offer} from '../../types/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


type MapProps = {
  offers: Offer[];
   activeOfferId?: number;
}

function Map({offers, activeOfferId}: MapProps): JSX.Element {
  //const offersCurr = useAppSelector((state) => state.offers);
  const currentLocation = useAppSelector((state) => state.offers[0]?.city.location);
  // eslint-disable-next-line no-console
  console.log(currentLocation);
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, offers[0]);

  const { pathname } = useLocation();
  // eslint-disable-next-line no-console
  console.log(offers);
  useEffect(() => {
    if (map) {
      const markerGroup = leaflet.layerGroup().addTo(map);
      map.setView(
        {
          lat: currentLocation.latitude,
          lng: currentLocation.longitude
        },
        currentLocation.zoom
      );

      offers.forEach((offer: Offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude
            },
            {
              icon: (activeOfferId !== null && offer.id === activeOfferId)
                ? currentCustomIcon
                : defaultCustomIcon
            }
          )
          .addTo(markerGroup);
      });

      return () => {
        markerGroup.clearLayers();
      };
    }
  }, [map, offers, activeOfferId]);

  return (
    <section className={`${pathname === '/' ? 'cities__map' : 'property__map'} map`} ref={mapRef}></section>
  );
}
export default Map;

