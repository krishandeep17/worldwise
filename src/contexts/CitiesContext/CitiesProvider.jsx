import { useCallback, useEffect, useReducer } from "react";

import { CitiesContext } from "./useCitiesContext";

const URL =
  import.meta.env.VITE_ENV === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

const initialState = {
  cities: [],
  currentCity: {},
  error: "",
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true };
    }

    case "cities/loaded": {
      return { ...state, cities: action.payload, isLoading: false };
    }

    case "city/loaded": {
      return { ...state, currentCity: action.payload, isLoading: false };
    }

    case "city/created": {
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    }

    case "city/deleted": {
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };
    }

    case "rejected": {
      return { ...state, error: action.payload };
    }

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
}

export default function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, currentCity, error, isLoading } = state;

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(URL);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error in loading the cities...",
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/${id}`);
        const data = await res.json();

        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error in loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error in adding the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error in deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        createCity,
        currentCity,
        deleteCity,
        error,
        getCity,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
