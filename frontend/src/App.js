import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  
  return (
    <div className="App">
      <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: -122.4,
        latitude: 20.5937,
        zoom: 4
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
    </div>
  );
}

export default App;
