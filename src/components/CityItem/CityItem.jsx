import { Link } from "react-router-dom";

import styles from "./CityItem.module.css";

import { Flag } from "../../components";
import formatDate from "../../utils/formatDate";
import { useCities } from "../../contexts/CitiesContext";

export default function CityItem({ city }) {
  const { currentCity } = useCities();

  const { emoji, cityName, date, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <Flag emoji={emoji} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
