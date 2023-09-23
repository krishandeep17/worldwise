import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);

  function getPosition() {
    // `navigator.geolocation` read-only property returns a `geolocation` object that gives Web content access to the location of the device.
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);

    // `getCurrentPosition` determines the device's current location and gives back a `GeolocationPosition` object with the data.
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { error, getPosition, isLoading, position };
}
