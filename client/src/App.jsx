// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import GenerateBreweries from './components/GenerateBreweries.jsx';
import LoginPage from './components/LoginPage.jsx';

const App = () => {
  const [user, setUser] = useState('');
  const [favorites, setFavorites] = useState([]);

  return (
    <div className="app-container">
      <h1>Find Some Suds</h1>
      <Routes>
        <Route
          path="/"
          element={
            <GenerateBreweries
              user={user}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
};

export default App;
