import styles from "./CountryList.module.css";

import { CountryItem, Message, Spinner } from "../../components";

import { useCitiesContext } from "../../contexts/CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce((accumulator, currentCity) => {
    if (accumulator.map((city) => city.country).includes(currentCity.country)) {
      return accumulator;
    } else {
      return [
        ...accumulator,
        { country: currentCity.country, emoji: currentCity.emoji },
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
