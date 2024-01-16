// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const GenerateBreweries = () => {
  const [breweries, setBreweries] = useState([]);
  const handleButton = async () => {
    console.log('beer');
    const response = await fetch('https://api.openbrewerydb.org/v1/breweries');
    const data = await response.json();
    setBreweries(data);
  };
  return (
    <div>
      <h1>Beeeeeeeeerrrrrrrrrrr</h1>
      <button onClick={handleButton}>Brew</button>
      <ul>
        {breweries.map((brew) => {
          return <li key={brew.id}>{brew.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default GenerateBreweries;
