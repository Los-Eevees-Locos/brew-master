import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GenerateBreweries from './components/GenerateBreweries.jsx';

function App(props) {
  return (
    <div>
      <h1>BEEEEER</h1>
      <Routes>
        <Route path="/" element={<GenerateBreweries />} />
      </Routes>
    </div>
  );
}

export default App;
