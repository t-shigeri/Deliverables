import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoogleMapComponent from "./components/GoogleMapComponent";
import ToiletList from "./components/ToiletList";
import SplashScreen from "./components/SplashScreen";
import "./App.css";

function App() {
  const [toilets, setToilets] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [isSplash, setIsSplash] = useState(true);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (isSplash) {
    return <SplashScreen onFinish={() => setIsSplash(false)} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div className="sidebar">
          <ToiletList
            toilets={toilets}
            selectedPlaceId={selectedPlaceId}
            onClickItem={(place) => setSelectedPlaceId(place.place_id)}
          />
        </div>
        <div style={{ width: "70%", position: "relative" }}>
          <GoogleMapComponent
            apiKey={googleMapsApiKey}
            onSetToilets={(results) => setToilets(results)}
            selectedPlaceId={selectedPlaceId}
            onSelectToilet={(place) =>
              setSelectedPlaceId(place ? place.place_id : null)
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
