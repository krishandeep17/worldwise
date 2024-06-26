import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCitiesContext } from "../../contexts/CitiesContext/useCitiesContext";

import Button from "../Button";
import Flag from "../Flag";
import Message from "../Message";
import Spinner from "../Spinner";
import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function City() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, error, currentCity, getCity } = useCitiesContext();

  useEffect(() => {
    getCity(id);
  }, [getCity, id]);

  if (isLoading) return <Spinner />;

  if (error) return <Message type="error" message={error} />;

  const { cityName, countryCode, date, notes } = currentCity;

  return (
    <div className={styles.cityWrapper}>
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>City name</h6>
          <div className={styles.cityName}>
            <Flag countryCode={countryCode} />
            <h3>{cityName}</h3>
          </div>
        </div>

        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date || null)}</p>
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
    </div>
  );
}
