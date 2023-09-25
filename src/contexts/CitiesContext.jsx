/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";

// CREATE A CONTEXT
const CitiesContext = createContext();

let url;

if (import.meta.env.VITE_ENV === "production") {
  url = import.meta.env.VITE_SERVER;
} else {
  url = "http://localhost:8000/cities";
}

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

export function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, currentCity, error, isLoading } = state;

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(url);
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

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${url}/${id}`);
      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error in loading the city...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(url, {
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
      await fetch(`${url}/${id}`, {
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
    // PROVIDE VALUE TO THE CHILD COMPONENTS
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

// CUSTOM HOOK
export function useCitiesContext() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}
