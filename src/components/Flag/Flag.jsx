import styles from "./Flag.module.css";

export default function Flag({ countryCode }) {
  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      srcSet={`https://flagcdn.com/48x36/${countryCode}.png 2x,https://flagcdn.com/72x54/${countryCode}.png 3x`}
      className={styles.flag}
      alt="Flag"
    />
  );
}
