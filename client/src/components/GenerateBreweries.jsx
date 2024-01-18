// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDistance } from 'geolib';
import GoogleMaps from './GoogleMaps';
import favoritedIcon from './favoritedIcon';
import LoginPage from './LoginPage';
import { FaRegStar, FaStar } from 'react-icons/fa';

//http://www.google.com/s2/favicons?domain=https://www.ocbeerco.com/

const GenerateBreweries = (props) => {
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

    //DETERMINE IF A BREWERY IS A FAVORITE
    //make a request to get a list of favorited breweries = dbFavList
    /*
        let dbFavs;
        axios
          .get('http://localhost:3000/favorites/')
          .then((response) => {
            console.log('GET request to /favorites RESPONSE: ', response)
            dbFavs = response;
          })
        console.log(dbFavs)
    */
    //add a property to each brewery in State called .isFavorited
    /* 
        setBreweries(breweries => breweries.map(brew => ({ ...brew, isFavorited: dbFavs.includes(brew.id) })));
    */
  };

  const favoriteButton = async (breweryId, add) => {
    if (!props.user) {
      window.alert('You have to be signed in to add favorites');
      return;
    }

    if (add) {
      axios
        .post('http://localhost:3000/favorites/', { breweryId })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .delete('http://localhost:3000/favorites/', { breweryId })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let count = 0;
  return (
    <div className="generate-container">
      <Link to={'/login'}>
        <p className="link">Login</p>
      </Link>
      {/* <h1>
        {lat} location {lon}
      </h1> */}
      <button className="brewery-button" onClick={handleButton}>
        {/* <img src="https://banner2.cleanpng.com/20180410/ofq/kisspng-emoji-beer-smiley-emoticon-symbol-beer-5acd36a3a34a73.0836923015233983076689.jpg"></img> */}
        Find Local Breweries
      </button>
      <ul className="brewery-list">
        {breweries.map((brew) => {
          if (count === 10) {
            return;
          }
          count += 1;
          // console.log(brew.latitude, brew.longitude);
          return (
            <li key={brew.id} className="brewery-card">
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
              {favoritedIcon(0)}
              {/* {props.favorites.includes(brew.id) ? (
                <FaStar
                  style={{ marginLeft: '0.5rem' }}
                  onClick={() => favoriteButton(brew.id, false)}
                />
              ) : (
                <FaRegStar
                  style={{ marginLeft: '0.5rem' }}
                  onClick={() => favoriteButton(brew.id, true)}
                />
              )} */}
            </li>
          );
        })}
      </ul>
      <div className="map">
        {<GoogleMaps lat={lat} lng={lon} breweries={breweries} />}
      </div>
    </div>
  );
};

export default GenerateBreweries;
