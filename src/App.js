import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Forms from './pages/forms/Forms';
import Termo from './pages/termo/Termo';

import Forms2 from './pages/forms2/Forms2';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
    <Router>
      
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Termo" element={<Termo />} />
        <Route path="/Forms" element={<Forms />} />
        <Route path="/Forms2" element={<Forms2 />} />
        
      </Routes>
      <ToastContainer />
    </Router>
    
  );
  
}

export default App;