import { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

const GoogleMaps = (props) => {
  const breweries = props.breweries.slice(0, 10);
  console.log(breweries);

  const [open, setOpen] = useState('');

  return (
    <div>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div
          style={{ height: '50vh', minWidth: '500px', border: '1px solid red' }}
        >
          <Map zoom={9} center={{ lat: props.lat, lng: props.lng }}>
            {breweries.map((brew) => {
              return (
                <div key={brew.id + `${Math.floor(Math.random() * 100)}`}>
                  <Marker
                    position={{
                      lat: Number(brew.latitude),
                      lng: Number(brew.longitude),
                    }}
                    onClick={() => setOpen(brew.id)}
                  ></Marker>
                  {open && open === brew.id && (
                    <InfoWindow
                      position={{
                        lat: Number(brew.latitude),
                        lng: Number(brew.longitude),
                      }}
                      onCloseClick={() => setOpen('')}
                    >
                      <p style={{ color: 'black' }}>
                        <strong>{brew.name}</strong>
                        <br></br>
                        {brew.address_1}
                        <br></br>
                        {brew.phone}
                        <br></br>
                        <a
                          href={brew.website_url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {brew.website_url}
                        </a>
                      </p>
                    </InfoWindow>
                  )}
                </div>
              );
            })}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default GoogleMaps;
