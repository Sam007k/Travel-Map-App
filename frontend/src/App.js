import React, { useState, useEffect } from 'react';
import './app.css'

import Map, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons'
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios'
import { format } from 'timeago.js'

function App() {
  const currentUser = 'Jane'
  const [pins, setPins] = useState([])
  // const [showPopup, setShowPopup] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom:4
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins')
        setPins(res.data)

      } catch (err) {
        console.log(err)
      }
    }
    getPins()
  }, [])

  const markerClickHandler = (id, lat, long) => {
    console.log('id', id)
    setViewState({...viewState,latitude: lat, longitude: long,zoom:5})
  }

  const handleAddClick = (e) => {
    console.log('e', e)
    const { lat, lng: lng } = e.lngLat
    setNewPlace({
      lat,
      lng
    })
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        {...viewState}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddClick}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={evt => setViewState(evt.viewState)}
      >
        {pins.map(pin => (
          <>
            <Marker color={pin.username === currentUser ? 'tomato' : 'slateblue'} longitude={pin.long} latitude={pin.lat} anchor="bottom" onClick={() => markerClickHandler(pin._id, pin.lat, pin.long)}>
            </Marker>
            {pin._id === currentPlaceId && (<Popup key={pin._id}
              latitude={pin.lat}
              longitude={pin.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left">
              <div className='card'>
                <label>Place</label>
                <h4 className='place'>{pin.title}</h4>
                <label>Review</label>
                <p className='desc'>{pin.desc}</p>
                <label>Rating</label>
                <div className='stars'>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <label>Information</label>
                <span className='username'>Created by <b>{pin.username}</b></span>
                <span className='date'>{format(pin.createdAt)}</span>
              </div>
            </Popup>)}</>
        ))}
        {newPlace && <Popup
          // key={pin._id}
          latitude={newPlace.lat}
          longitude={newPlace.lng}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="left">hello</Popup>}

      </Map>
    </div>
  );
}

export default App;
