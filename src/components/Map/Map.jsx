import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useCitiesContext } from "../../contexts/CitiesContext";
import styles from "./Map.module.css";
import Flag from "../Flag/Flag";

export default function Map() {
  const navigate = useNavigate();
  const { cities } = useCitiesContext();

  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
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
      </MapContainer>
    </div>
  );
}
