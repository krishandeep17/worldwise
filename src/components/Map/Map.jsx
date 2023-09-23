import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useCitiesContext } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import styles from "./Map.module.css";
import { Button, Flag } from "../../components";

export default function Map() {
  const { cities } = useCitiesContext();
  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [searchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji ? <Flag emoji={city.emoji} /> : <span>🚩</span>}
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeMapCenter position={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
}

// CHANGE CENTER OF THE MAP
function ChangeMapCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

// NAVIGATE TO FORM ON CLICK ON MAP
function DetectMapClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
