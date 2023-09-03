import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./City.module.css";

import { useCities } from "../../contexts/CitiesContext";
import { Button, Flag, Spinner } from "../../components";
import formatDate from "../../utils/formatDate";

export default function City() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, fetchCity, currentCity } = useCities();

  useEffect(() => {
    fetchCity(id);
  }, [id]);

  const { cityName, date, emoji, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <Flag emoji={emoji} /> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}
