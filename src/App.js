import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QRScannerComponent from './QRScanner';
import Dashboard from './Dashboard';
import './App.css';
import Header from './Header';
import Track from './Track';

import Home from './Home';
const App = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<QRScannerComponent />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/track" element={<Track/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      
    </div>
  </BrowserRouter>
);

export default App;
