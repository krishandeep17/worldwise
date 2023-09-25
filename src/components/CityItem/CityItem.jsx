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
  const { currentCity, deleteCity } = useCitiesContext();

  const { cityName, countryCode, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();

    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <Flag countryCode={countryCode} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date || null)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
