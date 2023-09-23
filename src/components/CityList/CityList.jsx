import styles from "./CityList.module.css";

import { CityItem, Message, Spinner } from "../../components";

import { useCitiesContext } from "../../contexts/CitiesContext";

export default function CityList() {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
