import styles from "./Flag.module.css";

// Change flag emoji to country code
const countryCode = (flag) =>
  Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");

export default function Flag({ emoji }) {
  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode(emoji)}.png`}
      srcSet={`https://flagcdn.com/48x36/${countryCode(
        emoji
      )}.png 2x,https://flagcdn.com/72x54/${countryCode(emoji)}.png 3x`}
      className={styles.flag}
      alt="Flag"
    />
  );
}
