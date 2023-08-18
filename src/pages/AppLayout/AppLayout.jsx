import styles from "./AppLayout.module.css";

import { Map, Sidebar } from "../../components";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
