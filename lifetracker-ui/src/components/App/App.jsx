import "./App.css";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import { useState } from "react";
import Register from "../Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";

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
          {/* <Route path="/login" element={<Login setAppState={setAppState} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
