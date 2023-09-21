import { Link } from "react-router-dom";

import styles from "./Logo.module.css";
import logo from "../../assets/logo.png";

export default function Logo() {
  return (
    <Link to="/">
      <img className={styles.logo} src={logo} alt="WorldWise logo" />
    </Link>
  );
}
