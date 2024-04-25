import { useEffect, useState } from "react";
export default function useDateDetails(datetime: Date) {
  const [timePassed, setTimePassed] = useState("Just now");
  const givenDateTime = datetime.getTime();

  useEffect(() => {
    const intervalId = setInterval(() => {
      function getTime() {
        const currentDateTime = new Date().getTime();

        const differenceInSeconds = (currentDateTime - givenDateTime) / 1000;
        if (differenceInSeconds < 30) {
          setTimePassed("Just now");
          return;
        } else if (differenceInSeconds < 60) {
          setTimePassed("1 min ago");
          return;
        } else if (differenceInSeconds < 3600) {
          const minutes = Math.floor(differenceInSeconds / 60);
          setTimePassed(`${minutes} min ago`);
          return;
        } else {
          const hours = datetime.getHours();
          const minutes = datetime.getMinutes();
          const finalTime =
            hours <= 12 ? `${hours}:${minutes}` : `${hours - 12}:${minutes}`;
          setTimePassed(finalTime);
        }
      }
      getTime();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return timePassed;
}
