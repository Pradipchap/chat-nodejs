import { useState, useEffect } from "react";

const useGetLocaion = (setPosition) => {
  const [location, setLocation] = useState(null);

  // Only run on mount and unmount
  useEffect(() => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setPosition({ latitude, longitude });
    }
    function error(error) {}

    navigator.geolocation.watchPosition(success, error);
  }, []);

  return {
    location,
  };
};

export default useGetLocaion;
