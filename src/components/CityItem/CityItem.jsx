import { Link } from "react-router-dom";

import styles from "./CityItem.module.css";

import Flag from "../Flag/Flag";

// Change date format
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { emoji, cityName, date } = city;

  return (
    <li>
      <Link className={styles.cityItem} to="">
        <Flag emoji={emoji} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
