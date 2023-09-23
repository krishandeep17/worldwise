/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// CREATE A CONTEXT
const CitiesContext = createContext();

let url;

if (import.meta.env.VITE_ENV === "production") {
  url = import.meta.env.VITE_SERVER;
} else {
  url = "http://localhost:8000/cities";
}

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(url);
        const data = await res.json();

        setCities(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const fetchCity = async (id) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${url}/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // PROVIDE VALUE TO THE CHILD COMPONENTS
    <CitiesContext.Provider
      value={{ cities, currentCity, fetchCity, isLoading }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// CUSTOM HOOK
export function useCitiesContext() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}
