import { useEffect, useState } from "react";
import returnMonth from "../functions/getMonth";

export default function useDateDetails(datetime: Date) {
  
  const [timePassed, setTimePassed] = useState(getTime());

  function getTime() {
    const givenDateTime = datetime.getTime();
    const currentDateTime = new Date().getTime();

    const differenceInSeconds = (currentDateTime - givenDateTime) / 1000;
    if (differenceInSeconds < 30) {
      // setTimePassed("Just now");
      return "Just now";
    } else if (differenceInSeconds < 60) {
      // setTimePassed("1 min ago");
      return "1 min ago";
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      // setTimePassed(`${minutes} min ago`);
      return `${minutes} min ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = datetime.getHours();
      const minutes = datetime.getMinutes();
      const finalTime =
        hours <= 12 ? `${hours}:${minutes} AM` : `${hours - 12}:${minutes} PM`;
      // setTimePassed(finalTime);
      return finalTime;
    } else if (differenceInSeconds < 31560000) {
      const month = returnMonth(datetime.getMonth() + 1);
      const day = datetime.getDate();
      return `${month} ${day}`;
    } else {
      const year = Math.floor(differenceInSeconds / 31560000);
      return `${year} ago`;
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      function setTime() {
        const x = getTime();
        setTimePassed(x);
      }
      setTime();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [datetime]);

  return timePassed;
}
