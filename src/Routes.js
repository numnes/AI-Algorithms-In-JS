import React from 'react';
import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Queens from './pages/Queens';
import QueensHome from './pages/Queens/home';
import SearchAlgorithms from './pages/Queens/IterativeDeepening';

export default function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />} />
        <Route exact path="/queens" element={<Queens />}>
          <Route path="" element={<QueensHome />} />
          <Route path="searchalgorithms" element={<SearchAlgorithms />} />
        </Route>
      </Router>
    </BrowserRouter>
  );
}
