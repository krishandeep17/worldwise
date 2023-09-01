import { Outlet } from "react-router-dom";

import styles from "./Sidebar.module.css";

import { AppNav, Footer, Logo } from "../../components";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
