import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// マップコンテナのスタイル
const containerStyle = {
  width: "100%",
  height: "100vh",
};

// 東京駅を仮の初期値
const defaultCenter = {
  lat: 35.681236,
  lng: 139.767125,
};

const SEARCH_RADIUS = 1500;
const TOILET_KEYWORD = "トイレ";

const GoogleMapComponent = ({
  apiKey,
  onSetToilets,
  selectedPlaceId,
  onSelectToilet,
}) => {
  const [location, setLocation] = useState(defaultCenter);
  const [mapInstance, setMapInstance] = useState(null);
  const [toilets, setToilets] = useState([]);

  // 1. 現在地取得
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("位置情報の取得に失敗しました:", error);
          // 権限拒否などは defaultCenter のまま
        }
      );
    }
  }, []);

  // 2. location/mapInstanceどちらか変化時にトイレ検索
  useEffect(() => {
    if (!mapInstance || !window.google || !window.google.maps.places) return;
    const service = new window.google.maps.places.PlacesService(mapInstance);
    const request = {
      location,
      radius: SEARCH_RADIUS,
      keyword: TOILET_KEYWORD,
    };
    service.nearbySearch(request, (results, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        setToilets(results);
        onSetToilets && onSetToilets(results);
      } else {
        console.error("PlacesServiceNearbySearch エラー:", status);
      }
    });
  }, [location, mapInstance]);

  // 3. マップのロード時
  const handleOnLoad = (map) => {
    setMapInstance(map);
  };

  // 4. マーカークリック
  const handleMarkerClick = (place) => {
    onSelectToilet && onSelectToilet(place);
  };

  // 5. 選択中トイレ
  const selectedPlace = toilets.find((p) => p.place_id === selectedPlaceId);

  // 6. アイコン生成
  const createIcon = (url, size) => {
    if (window.google && window.google.maps) {
      return {
        url,
        scaledSize: new window.google.maps.Size(size, size),
      };
    }
    return null;
  };

  // 7. JSX return
  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
        onLoad={handleOnLoad}
      >
        {/* 現在地マーカー */}
        <Marker
          position={location}
          icon={createIcon(
            "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
            30
          ) || undefined}
          title="現在地"
        />

        {/* トイレマーカー */}
        {toilets.map((place) => {
          const isSelected = selectedPlaceId === place.place_id;
          const iconUrl = isSelected
            ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
          const iconProps = createIcon(iconUrl, 32);

          return (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              onClick={() => handleMarkerClick(place)}
              icon={iconProps || undefined}
            />
          );
        })}

        {/* 選択中トイレのInfoWindow */}
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
            onCloseClick={() => onSelectToilet(null)}
          >
            <div style={{ maxWidth: "200px" }}>
              <h3 style={{ margin: "0 0 4px 0" }}>{selectedPlace.name}</h3>
              {selectedPlace.vicinity && (
                <p style={{ margin: 0, fontSize: "0.9em" }}>
                  {selectedPlace.vicinity}
                </p>
              )}
              {selectedPlace.rating && (
                <p style={{ margin: "4px 0", fontSize: "0.9em" }}>
                  評価: {selectedPlace.rating} ⭐
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
