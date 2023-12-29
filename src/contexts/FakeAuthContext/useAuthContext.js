import { createContext, useContext } from "react";

export const AuthContext = createContext();

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthProvider");

  return context;
}
