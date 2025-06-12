import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// マップコンテナのスタイル（親側で高さを担保しているなら height: "100%" にしてもOK）
const containerStyle = {
  width: "100%",
  height: "100vh",
};

// マップの初期中心座標（東京駅を仮置き。Geolocation 取得後に上書き）
const defaultCenter = {
  lat: 35.681236,
  lng: 139.767125,
};

// 検索範囲（メートル）。この半径内を検索する。例：1500m
const SEARCH_RADIUS = 1500;

// Places API に投げるキーワード。「トイレ」で検索する
const TOILET_KEYWORD = "トイレ";
const TOILET_KEYWORD_EN = "toilet";

const GoogleMapComponent = ({
  apiKey,
  onSetToilets,
  selectedPlaceId,
  onSelectToilet,
}) => {
  const [location, setLocation] = useState(defaultCenter); // 現在地
  const [mapInstance, setMapInstance] = useState(null);     // GoogleMap インスタンス
  const [toilets, setToilets] = useState([]);               // トイレ施設一覧

  // ① Geolocation で現在地を取得
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
          // 権限拒否などは defaultCenter のまま表示
        }
      );
    }
  }, []);

  // ② マップがロードされたときのコールバック
  const handleOnLoad = (map) => {
    setMapInstance(map);

    // *** ここで PlacesService を利用するためには "places" ライブラリ読み込みが必須 ***
    if (!window.google || !window.google.maps.places) {
      console.error("PlacesService が利用できません。libraries に 'places' を含めてください。");
      return;
    }

    // PlacesService を使って周辺トイレを検索
    const service = new window.google.maps.places.PlacesService(map);
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
  };

  // ③ マーカークリック時のコールバックを親へ
  const handleMarkerClick = (place) => {
    onSelectToilet && onSelectToilet(place);
  };

  // ④ 現在選択中の Place を toilets から探す
  const selectedPlace = toilets.find((p) => p.place_id === selectedPlaceId);

  // ⑤ アイコンの props を生成（window.google.maps が存在してから）
  const createIcon = (url, size) => {
    if (window.google && window.google.maps) {
      return {
        url,
        scaledSize: new window.google.maps.Size(size, size),
      };
    }
    // スクリプト読み込み前は null → デフォルトアイコンを利用
    return null;
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={["places"]} // ← ここで必ず "places" を指定する
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
        onLoad={handleOnLoad}
      >
        {/* ① 現在地マーカー */}
        {createIcon(
          "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
          30
        ) ? (
          <Marker
            position={location}
            icon={createIcon(
              "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
              30
            )}
            title="現在地"
          />
        ) : (
          <Marker position={location} title="現在地" />
        )}

        {/* ② トイレマーカーをループで表示 */}
        {toilets.map((place) => {
          const isSelected = selectedPlaceId === place.place_id;
          const iconUrl = isSelected
            ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";

          const iconProps = createIcon(iconUrl, 32);

          return iconProps ? (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              onClick={() => handleMarkerClick(place)}
              icon={iconProps}
            />
          ) : (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              onClick={() => handleMarkerClick(place)}
            />
          );
        })}

        {/* ③ 選択中のトイレに InfoWindow を表示 */}
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
