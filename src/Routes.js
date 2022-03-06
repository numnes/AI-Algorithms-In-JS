import React from 'react';
import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Queens from './pages/Queens';

export default function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/queens" element={<Queens />} />
      </Router>
    </BrowserRouter>
  );
}
