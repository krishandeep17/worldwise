import Flag from "../Flag";
import styles from "./CountryItem.module.css";

export default function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Flag countryCode={country.countryCode} />
      <span>{country.country}</span>
    </li>
  );
}
