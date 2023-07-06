import "./App.css";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import { useState } from "react";
import Register from "../Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import ActivityPage from "../ActivityPage/ActivityPage";

function App() {
  const [appState, setAppState] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={appState.user} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register setAppState={setAppState} />}
          />
          <Route path="/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/portal"
            element={
              <ActivityPage
                setAppState={setAppState}
                appState={appState}
                user={appState?.user}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
