import styles from "./CountryItem.module.css";

import { Flag } from "../../components";

export default function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      {country.emoji ? <Flag emoji={country.emoji} /> : <span>🚩</span>}
      <span>{country.country}</span>
    </li>
  );
}
