// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getDistance } from 'geolib';
import GoogleMaps from './GoogleMaps';
//http://www.google.com/s2/favicons?domain=https://www.ocbeerco.com/

const GenerateBreweries = () => {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  // const [position, setPosition] = useState({ lat: lat, lng: lon });
  // const [dist, setDist] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      // setPosition({
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // });
    });
  });
  const [breweries, setBreweries] = useState([]);
  const handleButton = async () => {
    console.log('beer');

    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_dist=${lat},${lon}`
    );
    const data = await response.json();
    console.log(data);
    setBreweries(data);
    // setDist(getDistance({latitude: lat, longitude:lon}, {}));
  };
  let count = 0;
  return (
    <div>
      <h1>Beeeeeeeeerrrrrrrrrrr</h1>
      <h1>
        {lat} location {lon}
      </h1>
      <button onClick={handleButton}>Beer me, bro</button>
      <ul>
        {breweries.map((brew) => {
          if (count === 10) {
            return;
          }
          count += 1;
          // console.log(brew.latitude, brew.longitude);
          return (
            <li key={brew.id}>
              <img
                src={`http://www.google.com/s2/favicons?domain=${brew.website_url}`}
                alt="logo"
              />
              Name: {brew.name} Dist:{' '}
              {(
                0.000621371 *
                getDistance(
                  { latitude: lat, longitude: lon },
                  { latitude: brew.latitude, longitude: brew.longitude },
                  0.01
                )
              ).toFixed(2)}{' '}
              miles
              <button>Favorite</button>
            </li>
          );
        })}
      </ul>
      <div>{<GoogleMaps lat={lat} lng={lon} breweries={breweries} />}</div>
    </div>
  );
};

export default GenerateBreweries;
