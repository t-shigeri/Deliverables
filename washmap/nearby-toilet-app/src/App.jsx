import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoogleMapComponent from "./components/GoogleMapComponent";
import ToiletList from "./components/ToiletList";
import "./App.css";

function App() {
  const [toilets, setToilets] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />

      {/* メイン部分：ヘッダー／フッターを除いた残りを flex:1 */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div className="sidebar">
          <ToiletList
            toilets={toilets}
            selectedPlaceId={selectedPlaceId}
            onClickItem={(place) => setSelectedPlaceId(place.place_id)}
          />
        </div>

        {/* マップ領域 */}
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
