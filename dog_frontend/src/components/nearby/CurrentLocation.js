import React, { useEffect, useState } from "react";

const useCurrentLocation = (options = {}) => {
  // store location in state
  const [location, setLocation] = useState({ latitude: 54, longitude: 6 });
  const [error, setError] = useState(undefined);

  // Success handler for geolocation's `getCurrentPosition` method
  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Error handler for geolocation's `getCurrentPosition` method
  const handleError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    // Call the Geolocation API
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  // Expose location result and the possible error message
  return { location, error };
};

export default useCurrentLocation;
