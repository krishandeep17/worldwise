import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  AppLayout,
  Homepage,
  Login,
  PageNotFound,
  Pricing,
  Product,
} from "./pages";

import { City, CityList, CountryList } from "./components";

let url;

if (import.meta.env.VITE_ENV === "production") {
  url = "https://krishandeep17.github.io/data/cities.json";
} else {
  url = "http://localhost:8000/cities";
}

export default function App() {
  const [cities, setCities] = useState([]);
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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
