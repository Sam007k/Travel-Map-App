import React, { useState, useEffect } from "react";
import "./app.css";

import Map, { Marker, Popup } from "react-map-gl";
import { Star } from "@material-ui/icons";
import "mapbox-gl/dist/mapbox-gl.css";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
import { userRequest } from "./requestMethods";
import { SearchBox } from '@mapbox/search-js-react';


function App() {
  const myStorage = window.localStorage;
  const [pins, setPins] = useState([]);
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  // const [showPopup, setShowPopup] = useState(false);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 4,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await userRequest.get('/pins')

        setPins(res.data)

      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const markerClickHandler = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long, zoom: 5 });
  };

  const handleAddClick = (e) => {
    const { lat, lng: lng } = e.lngLat;
    setNewPlace({
      lat,
      lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      // username: currentUsername,
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.lng,
    };

    try {
      const res = await userRequest.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };

  const searchHandler = (e) => {
    let lat = e.features[0].properties.coordinates.latitude
    let long = e.features[0].properties.coordinates.longitude

    setViewState({ ...viewState, latitude: lat, longitude: long, zoom: 12 })
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        {...viewState}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={handleAddClick}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        <form style={{margin: '0 auto', marginTop:'20px'}}>
          <SearchBox accessToken={process.env.REACT_APP_MAPBOX} onRetrieve={searchHandler} value="" />
        </form>
        {pins.map((pin) => (
          <>
            <Marker
              color={pin.username === currentUsername ? "tomato" : "slateblue"}
              longitude={pin.long}
              latitude={pin.lat}
              anchor="bottom"
              onClick={() => markerClickHandler(pin._id, pin.lat, pin.long)}
            ></Marker>
            {pin._id === currentPlaceId && (
              <Popup
                key={pin._id}
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{pin.title}</h4>
                  <label>Review</label>
                  <p className="desc">{pin.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(pin.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{pin.username}</b>
                  </span>
                  <span className="date">{format(pin.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            // key={pin._id}
            latitude={newPlace.lat}
            longitude={newPlace.lng}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}

        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}

        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
      </Map>
    </div>
  );
}

export default App;
