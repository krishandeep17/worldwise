import { useCitiesContext } from "../../contexts/CitiesContext/useCitiesContext";

import CountryItem from "../CountryItem";
import Message from "../Message";
import Spinner from "../Spinner";
import styles from "./CountryList.module.css";

export default function CountryList() {
  const { isLoading, error, cities } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (error) return <Message type="error" message={error} />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((accumulator, currentCity) => {
    if (accumulator.map((city) => city.country).includes(currentCity.country)) {
      return accumulator;
    } else {
      return [
        ...accumulator,
        { country: currentCity.country, countryCode: currentCity.countryCode },
      ];
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
