import styles from "./Message.module.css";

export default function Message({ type, message }) {
  return (
    <p className={styles.message}>
      <span role="img">{type === "error" ? "⚠️" : "👋🏻"}</span> {message}
    </p>
  );
}
