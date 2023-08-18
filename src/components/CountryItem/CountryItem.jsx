import styles from "./CountryItem.module.css";

import Flag from "../Flag/Flag";

export default function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Flag emoji={country.emoji} />
      <span>{country.country}</span>
    </li>
  );
}
