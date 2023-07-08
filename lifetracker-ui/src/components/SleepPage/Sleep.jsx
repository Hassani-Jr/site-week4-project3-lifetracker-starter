import "./SleepPage.css";

import React from "react";
import { useState } from "react";
import axios from "axios";
import SleepData from "./SleepData";

export default function Sleep({
  userInfo,
  setUserInfo,
  navbar,
  setNavbar,
  user,
}) {
  const [sleepUser, setSleepUser] = useState({ starttime: "", endtime: "" });

  const userId = localStorage.getItem("id");

  const [sleepState, setSleepState] = useState();
  const [isOn, setIsOn] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("https://hassani-lifetracker-backend.onrender.com/auth/sleep", {
        userId: userId,
        sleepdata: sleepUser,
      })
      .then((response) => {
        console.log("Sleep data added successfully:", response.data);
        setSleepUser(response.data);
        setSleepState(true);
        // Handle successful login
      })
      .catch((error) => {
        console.error("Error logging in user:", error);
        // Handle error during login
      });
  }

  function handleChange(event) {
    setSleepUser({
      ...sleepUser,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      {user?.email ? (
        <div className="sleepForm-container">
          <h1 className="title">Sleep Log</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="starttime">
              <p>Start Time</p>
              <input
                type="datetime-local"
                name="starttime"
                value={sleepUser.starttime}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="endtime">
              <p>End Time</p>
              <input
                type="datetime-local"
                name="endtime"
                value={sleepUser.endtime}
                onChange={handleChange}
                required
              />
            </label>
            <button className="sleep-submit" type="submit">
              Add Sleep
            </button>
          </form>
          <SleepData sleepState={sleepState} setSleepState={setSleepState} />
        </div>
      ) : (
        <h1>Login to see your data</h1>
      )}
    </>
  );
}
