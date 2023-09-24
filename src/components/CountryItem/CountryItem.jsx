import styles from "./CountryItem.module.css";

import { Flag } from "../../components";

export default function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Flag countryCode={country.countryCode} />
      <span>{country.country}</span>
    </li>
  );
}
