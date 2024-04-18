import { useCitiesContext } from "../../contexts/CitiesContext/useCitiesContext";

import CityItem from "../CityItem";
import Message from "../Message";
import Spinner from "../Spinner";
import styles from "./CityList.module.css";

export default function CityList() {
  const { isLoading, error, cities } = useCitiesContext();

  if (isLoading) return <Spinner />;

  if (error) return <Message type="error" message={error} />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
