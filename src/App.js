import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { Forms, Termo } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Termo" element={<Termo />} />
        <Route path="/Forms" element={<Forms />} />
      </Routes>
    </Router>
  );
}

export default App;