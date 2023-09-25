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
    async function fetchCities() {
      try {
        setIsLoading(true);

        const res = await fetch(url);
        const data = await res.json();

        setCities(data);
      } catch (error) {
        alert("There was an error in loading the cities...");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function fetchCity(id) {
    try {
      setIsLoading(true);

      const res = await fetch(`${url}/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (error) {
      alert("There was an error in loading the city...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was an error in adding the city...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    // PROVIDE VALUE TO THE CHILD COMPONENTS
    <CitiesContext.Provider
      value={{ cities, createCity, currentCity, fetchCity, isLoading }}
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
