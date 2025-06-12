import React, { useEffect } from "react";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        backgroundColor: "#00acc1",
        color: "#fff",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        WashMap
      </h1>
      <p style={{ fontSize: "1.2rem" }}>now loding...!</p>
    </div>
  );
};

export default SplashScreen;
