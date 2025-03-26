import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { Forms, Termo } from './pages';
import Forms2 from './pages/forms2/Forms2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Termo" element={<Termo />} />
        <Route path="/Forms" element={<Forms />} />
        <Route path="/Forms2" element={<Forms2 />} />
      </Routes>
    </Router>
  );
}

export default App;