import { createContext, useContext } from "react";

export const CitiesContext = createContext();

export function useCitiesContext() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("useCitiesContext must be used within a CitiesProvider");

  return context;
}
