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
  const info = [];
  for (let i = 0; i < 10; i++) {
    info.push(false);
  }
  const [open, setOpen] = useState(info);
  let id = 0;
  return (
    <div>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: '50vh' }}>
          <Map zoom={9} center={{ lat: props.lat, lng: props.lng }}>
            {breweries.map((brew) => {
              id++;
              return (
                <>
                  <Marker
                    key={brew.id}
                    id={id}
                    position={{
                      lat: Number(brew.latitude),
                      lng: Number(brew.longitude),
                    }}
                    onClick={() => setOpen((open[id] = true))}
                  ></Marker>
                  {open[id] && (
                    <InfoWindow
                      position={{
                        lat: Number(brew.latitude),
                        lng: Number(brew.longitude),
                      }}
                      onCloseClick={() => setOpen((open[id] = true))}
                    >
                      <p style={{ color: 'black' }}>
                        {brew.name} {brew.address_1} {brew.phone}{' '}
                        {brew.website_url}
                      </p>
                    </InfoWindow>
                  )}
                </>
              );
            })}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default GoogleMaps;
