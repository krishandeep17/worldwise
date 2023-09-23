import { Link } from "react-router-dom";

import { useCitiesContext } from "../../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Flag } from "../../components";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity } = useCitiesContext();

  const { emoji, cityName, date, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {emoji ? <Flag emoji={emoji} /> : <span>🚩</span>}
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date || null)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
