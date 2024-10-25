// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scanner from './components/Scanner';
import Results from './components/Results';
import Alternatives from './components/Alternatives';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Scanner />} />
          <Route path="/results" element={<Results />} />
          <Route path="/alternatives" element={<Alternatives />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
