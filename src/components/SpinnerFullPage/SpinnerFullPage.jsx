import styles from "./SpinnerFullPage.module.css";
import { Spinner } from "../../components";

export default function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullPage}>
      <Spinner />
    </div>
  );
}
