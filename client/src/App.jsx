// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GenerateBreweries from './components/GenerateBreweries.jsx';

const App = () => {
  return (
    <div>
      <h1>BEEEEER</h1>
      <Routes>
        <Route path="/" element={<GenerateBreweries />} />
      </Routes>
    </div>
  );
};

export default App;
