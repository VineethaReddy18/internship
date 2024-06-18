import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import QRScanner from "./components/QRScanner";
import Dashboard from "./components/Dashboard";
import "./App.css";
import Header from "./components/Header";
import Track from "./components/Track";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import MainApp from "./components/MainApp/MainApp";
const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainApp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/track" element={<Track />} />
        <Route exact path="/home" element={<Home />} />
        <Route element={<NotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
