import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCitiesContext } from "../../contexts/CitiesContext/useCitiesContext";
import { useUrlPosition } from "../../hooks/useUrlPosition";

import Button from "../Button";
import Flag from "../Flag";
import Message from "../Message";
import Spinner from "../Spinner";
import styles from "./Form.module.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

function formatDateToYYYYMMDD(date) {
  // Extract year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-based
  const day = String(date.getDate()).padStart(2, "0");

  // Formatted date string in "YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default function Form() {
  const id = useId();
  const { createCity, isLoading } = useCitiesContext();
  const [lat, lng] = useUrlPosition();

  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState(formatDateToYYYYMMDD(new Date()));
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode.toLowerCase());
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      countryCode,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />;
  }

  return (
    <div className={styles.formWrapper}>
      <form
        className={`${styles.form} ${isLoading ? styles.loading : ""}`}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label htmlFor={id + "-cityName"}>City name</label>
          <div className={styles.relative}>
            <input
              id={id + "-cityName"}
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />

            <div className={styles.flag}>
              <Flag countryCode={countryCode} />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor={id + "-date"}>When did you go to {cityName}?</label>
          <input
            type="date"
            id={id + "-date"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            id="notes"
            maxLength={100}
            rows={3}
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>

        <div className={styles.buttons}>
          <Button type="primary">Add</Button>
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
      </form>
    </div>
  );
}
