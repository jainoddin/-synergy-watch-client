import React from "react";
import "./App.css";
import Login from "./client/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./client/Home";
import Register from "./client/Register";
import IndividualVideo from "./client/components/IndividualVideos";
import { useState } from "react";
import Trending from "./client/components/Trending";
import Gamming from "./client/components/Gamming";
import Saved from "./client/components/Saved";

function App() {
  const [userName, setUserName] = useState("");


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Register" element={<Register></Register>}></Route>
          <Route
            path="/video/:id"
            element={<IndividualVideo></IndividualVideo>}
          ></Route>
          <Route path="/saved" element={<Saved></Saved>}></Route>
          <Route path="/gamming" element={<Gamming></Gamming>}></Route>
          <Route path="/trending" element={<Trending></Trending>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
