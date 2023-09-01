import styles from "./CountryItem.module.css";

import { Flag } from "../../components";

export default function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Flag emoji={country.emoji} />
      <span>{country.country}</span>
    </li>
  );
}
