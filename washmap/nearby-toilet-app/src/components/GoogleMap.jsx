import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "50%",
    height: "400px",
};

const center = {
    lat: 35.6762,
    lng: 139.6503,
};

const GoogleMapComponent = ({ apiKey }) => {
    const [location, setLocation] = useState(center);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    // window.google が未定義の間は iconProps を null にしておく
    const iconProps = window.google && window.google.maps
        ? {
            url: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
            scaledSize: new window.google.maps.Size(30, 30),
        }
        : null;

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={15}
            >
                {/* アイコンを設定する場合は iconProps を渡す。読み込み前は渡さない */}
                {iconProps ? (
                    <Marker position={location} icon={iconProps} title="現在地" />
                ) : (
                    <Marker position={location} title="現在地" />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
