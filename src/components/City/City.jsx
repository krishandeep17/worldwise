import { useParams } from "react-router-dom";

import styles from "./City.module.css";

export default function City() {
  const { id } = useParams();

  return <h2>City {id}</h2>;
}
