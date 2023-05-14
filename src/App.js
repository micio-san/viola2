import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Nav from "./Components/Nav";
import Homepage from "./Components/Homepage";
import SecondPage from "./Components/SecondPage";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/:id/:date" element={<SecondPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
