import { useEffect, useState } from "react";
import axios from "axios";

import "./SleepPage.css";

export default function SleepData({ sleepState, setSleepState }) {
  const id = localStorage.getItem("id");
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/auth/sleepdata", { id: id })
      .then((response) => {
        console.log("Sleep data retrieved successfully:", response.data);
        setSleepData(response.data.sleepdata);
      })
      .catch((error) => {
        console.error("Error retrieving sleep data:", error);
      });

    setSleepState(false);
  }, [sleepState, setSleepState, id]);

  function formatDate(dateTime) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDateTime = new Date(dateTime).toLocaleDateString(
      undefined,
      options
    );
    return formattedDateTime;
  }

  function calculateHoursSlept(startDateTime, endDateTime) {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const diffInMilliseconds = end - start;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
    return diffInHours.toFixed(2);
  }

  return (
    <>
      <div className="sleep-wrapper">
        <div className="sleepData-container">
          {sleepData
            .sort((a, b) => b.id - a.id)
            .map((sleep, index) => (
              <div className="sleepData-item" key={index}>
                <div className="sleep-hours">
                  <p>
                    {calculateHoursSlept(sleep.start_time, sleep.end_time) +
                      " hrs"}
                  </p>
                </div>

                <h2>Start Time</h2>
                <p>{formatDate(sleep.start_time)}</p>
                <h2>End Time</h2>
                <p>{formatDate(sleep.end_time)}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
