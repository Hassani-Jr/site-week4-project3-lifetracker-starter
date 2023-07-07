import "./App.css";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import { useEffect, useState } from "react";
import Register from "../Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import ActivityPage from "../ActivityPage/ActivityPage";
import apiClient from "../../services/apiClient";

function App() {
  const [appState, setAppState] = useState({});
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) setUser(data.user);
      if (error) setError(data.error);
    };
    const token = localStorage.getItem("hello_world");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, []);

  const handleLogout = async () => {
    await apiClient.logoutUser();
    setUser({});
    setError(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} handleLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <Register
                setAppState={setAppState}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login user={user} setUser={setUser} setAppState={setAppState} />
            }
          />
          <Route
            path="/me"
            element={
              <ActivityPage
                setAppState={setAppState}
                appState={appState}
                user={user}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
