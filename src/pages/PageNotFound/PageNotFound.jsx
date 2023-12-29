import { Link } from "react-router-dom";

import PageNav from "../../components/PageNav";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.pageNotFound}>
      <PageNav />
      <section>
        <h2>Sorry, this page isn&apos;t available.</h2>
        <p>
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <Link to="/" className={styles.link}>
            Go back to WorldWise
          </Link>
        </p>
      </section>
    </main>
  );
}
