import { Link } from "react-router-dom";

import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <Link to="/">
      <img className={styles.logo} src="/logo.png" alt="WorldWise logo" />
    </Link>
  );
}
