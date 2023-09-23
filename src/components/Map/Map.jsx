import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { useCitiesContext } from "../../contexts/CitiesContext";
import styles from "./Map.module.css";
import Flag from "../Flag/Flag";

export default function Map() {
  const navigate = useNavigate();
  const { cities } = useCitiesContext();

  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [searchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
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
